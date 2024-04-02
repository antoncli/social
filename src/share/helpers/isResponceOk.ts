import { AxiosResponse } from "axios";

export const isResponceOk = async (responce: Promise<AxiosResponse<any, any>>): Promise<boolean> => {
  const res = await responce;
  return res.status >= 200 && res.status <= 400;
};
