import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { request } from "../config/api";

function getRedirectTo() {
  if (typeof window !== "undefined" && window.location) {
    return window.location;
  }
  return {};
}
export const withUser = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const cookieToken = cookie.get("token");
    useEffect(() => {
      // const redir = getRedirectTo();
      if (cookieToken) {
        request.defaults.headers.Authorization = `${"Bearer"} ${cookieToken}`;
      } else {
        router.push(`/login`, "/login", {
          shallow: true,
        });
      }
    }, [cookieToken]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
