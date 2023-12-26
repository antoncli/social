import { SignInTokenDataIn } from "@/share/api/users/types/SignInTokenDataIn";

export type SignInTokenDataOut = SignInTokenDataIn & {
  iat: number;
  exp: number;
};
