import { api } from "@services/api";

export const postService = {
  add,
  get,
  getFriends,
  remove,
};

function add(text: string) {
  return api.post("/post/add", { text });
}

function get(name: string, page: number, limit: number) {
  return api.get("/post/get", { params: { name, page, limit } });
}

function getFriends(page: number, limit: number) {
  return api.get("/post/get_friends", { params: { page, limit } });
}

function remove(id: string) {
  return api.post("/post/delete", { id });
}
