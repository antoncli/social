import { AuthorizedSchema } from "@/schemas/AuthorizedSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { printFetchError } from "@/share/helpers/printFetchError";

export const useAuthorized = () => {
  const router = useRouter();

  useEffect(() => {
    isAuthorized();
  }, []);

  const isAuthorized = async () => {
    try {
      const res = await axios.get("/api/users/authorized");
      const authorized = AuthorizedSchema.safeParse(res.data);
      if (!authorized.success || !authorized.data.authorized) router.push("/signin");
    } catch (error) {
      printFetchError(error);
      router.push("/signin");
    }
  };
};
