import { api } from "@/services/api";
import { SignIn } from "@/services/interfaces/signin";
import { SignUp } from "@/services/interfaces/signup";

export const authService = {
  signin,
  signup,
  signout,
};

function signin(user: SignIn) {
  return api.post("/auth/signin", user);
}

function signup(user: SignUp) {
  return api.post("/register/signup", user);
}

function signout() {
  return api.post("auth/signout");
}
