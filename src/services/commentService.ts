import { api } from "@services/api";

export const commentService = {
  add,
  edit,
  remove,
  get,
  page,
};

function add(owner: string, text: string) {
  return api.post("/comment/add", { owner, text });
}

function edit(owner: string, commentId: string, text: string) {
  return api.post("/comment/edit", { owner, commentId, text });
}

function remove(owner: string, commentId: string) {
  return api.post("/comment/delete", { owner, commentId });
}

function get(owner: string, commentId: string) {
  return api.get("/comment/get", { params: { owner, commentId } });
}

function page(owner: string, page: number, limit: number) {
  return api.get("/comment/page", { params: { owner, page, limit } });
}
