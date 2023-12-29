import axios from "axios";

export const userService = {
  find,
};

function find(input: string, page: number, limit: number) {
  return axios.get("/api/users/find", { params: { input, page, limit } });
}
