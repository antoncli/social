import { AxiosError } from "axios";

export const printFetchError = (error: any) => {
  if (error instanceof AxiosError) {
    console.error(error.response?.data);
  }
  if (error instanceof Error) {
    console.error(error.message);
  }
  console.log("Unknown fetch error type!");
};
