import { isObject } from "lodash";

export const isObjectAsAny = (data: any): data is Object => {
  return isObject(data);
};
