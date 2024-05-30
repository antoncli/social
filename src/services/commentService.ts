import { api } from "@services/api";

export const commentService = {
  add,
  remove,
  get,
  getIds,
};

function add(owner: string, text: string) {
  return api.post("/comment/add", { owner, text });
}

function remove(owner: string, commentId: string) {
  return api.post("/comment/delete", { owner, commentId });
}

function get(owner: string, page: number, limit: number) {
  return api.get("/comment/get", { params: { owner, page, limit } });
}

function getIds(owner: string, page: number, limit: number) {
  return api.get("/comment/getIds", { params: { owner, page, limit } });
}
