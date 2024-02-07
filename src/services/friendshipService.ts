import { api } from "@/services/api";

export const friendshipService = {
  add,
  get,
  accept,
  accepted,
  remove,
  friend,
};

function add(name: string) {
  return api.post("/friendship/add", { name });
}

function get(name: string) {
  return api.get("/friendship/get", { params: { name } });
}

function accept(name: string) {
  return api.post("/friendship/accept", { name });
}

function accepted(name: string) {
  return api.get("/friendship/accepted", { params: { name } });
}

function remove(name: string) {
  return api.post("/friendship/delete", { name });
}

function friend(name: string) {
  return api.get("/friendship/friend", { params: { name } });
}
