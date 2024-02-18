import { parseJwt } from "@share/helpers/parseJwt";

export const getJWTData = () => {
  return parseJwt(localStorage.getItem("access_token")!);
};
