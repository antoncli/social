import { api } from "@services/api";

export const reactionService = {
  like,
  unlike,
  dislike,
  undislike,
};

function like(owner: string) {
  return api.post("/reaction/like", { owner });
}

function unlike(owner: string) {
  return api.post("/reaction/unlike", { owner });
}

function dislike(owner: string) {
  return api.post("/reaction/dislike", { owner });
}

function undislike(owner: string) {
  return api.post("/reaction/undislike", { owner });
}
