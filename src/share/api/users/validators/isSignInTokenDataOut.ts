import { SignInTokenDataOut } from "@/share/api/users/types/SignInTokenDataOut";
import { isObjectAsAny } from "@/share/helpers/isObjectAsAny";
import { isFinite, isString } from "lodash";

export const isSignInTokenDataOut = (data: any, text?: string): data is SignInTokenDataOut => {
  text = text || "SignInTokenDataOut validation error:";

  if (!isObjectAsAny(data)) return new Error(`${text} data is not a object`) && false;
  if (!isString(data.id)) return new Error(`${text} data is not a string`) && false;
  if (!isString(data.email)) return new Error(`${text} data is not a string`) && false;
  if (!isFinite(data.iat)) return new Error(`${text} data is not a number`) && false;
  if (!isFinite(data.exp)) return new Error(`${text} data is not a number`) && false;

  return true;
};
