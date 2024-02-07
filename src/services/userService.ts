import { api } from "@/services/api";

export const userService = {
  find,
};

function find(input: string, page: number, limit: number) {
  return api.get("/users/find", { params: { input, page, limit } });
}
