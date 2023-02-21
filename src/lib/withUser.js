import { Login } from "@mui/icons-material";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SignIn from "../../pages/login";
import LoadingSpinner from "../components/LoadingSpinner";
import { request } from "../config/api";
import { useLeadsStatus } from "../data/useLeadsStatus";

function getRedirectTo() {
  if (typeof window !== "undefined" && window.location) {
    return window.location;
  }
  return {};
}
export const withUser = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { data, loading } = useLeadsStatus();
    const router = useRouter();
    const cookieToken = cookie.get("token");

    useEffect(() => {
      router.replace(router.pathname, undefined, { shallow: true });
    }, [data]);
    function AuthLogin() {
      useEffect(() => {
        router.replace("/login", undefined, { shallow: true });
      }, []);
      return <SignIn />;
    }

    return (
      <>
        {loading ? (
          <LoadingSpinner />
        ) : !data?.length && !cookieToken ? (
          <AuthLogin />
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };

  return Wrapper;
};
