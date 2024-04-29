import { api } from "@services/api";

export const likeService = {
  increment,
  decrement,
  count,
};

function increment(owner: string) {
  return api.post("/like/increment", { owner });
}

function decrement(owner: string) {
  return api.post("/like/decrement", { owner });
}

function count(owner: string) {
  return api.get("/like/count", { params: { owner } });
}
