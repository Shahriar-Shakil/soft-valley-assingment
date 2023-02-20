import { useContext } from "react";
import UserContext from "../user-context";

export const useAuth = () => {
  // const { user, token, login, logout, setUser } = useContext(UserContext) ?? {};
  const { token, login, logout } = useContext(UserContext) ?? {};

  return { token, login, logout };
};
