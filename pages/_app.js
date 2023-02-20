import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "antd/dist/antd";
import "../styles/custom.css";
import cookies from "js-cookie";
import { request } from "../src/config/api";
import UserContext from "../src/user-context";
import { SWRConfig } from "swr";
import Router from "next/router";
import { notification } from "antd";
import { RecoilRoot } from "recoil";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const fetcher = (url) => {
  const cookieToken = cookies.get("token");
  request.defaults.headers.Authorization = `${"Bearer"} ${cookieToken}`;
  return request.get(url).then((r) => r.data);
};

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [token, setToken] = React.useState(cookies.get("token"));
  const [user, setUser] = React.useState(null);
  const login = (token) => {
    cookies.set("token", token, { expires: 1 });
    setToken(token);
    request.defaults.headers.Authorization = `Bearer ${token}`;
    Router.push("/");
  };
  const logout = () => {
    setToken(null);
    delete request.defaults.headers.Authorization;
    cookies.remove("token");
    Router.push("/login");
    notification["warning"]({
      message: "Logout successfully",
      duration: 2,
    });
  };
  return (
    <RecoilRoot>
      <UserContext.Provider
        value={{
          // user: this.state.user,
          token: token,
          login: login,
          logout,
          // setUser: this.setUser,
        }}
      >
        <SWRConfig value={{ fetcher }}>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </SWRConfig>
      </UserContext.Provider>
    </RecoilRoot>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
