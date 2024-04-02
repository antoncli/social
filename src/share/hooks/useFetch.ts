import { WebSocketNotification } from "@/services/enums/WebSocketNotification";
import WsNotification from "@/services/websocket/WsNotification";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

type Service = (...args: any[]) => any;
type Options<T extends Service, K extends z.ZodSchema> = {
  service: T;
  params?: Parameters<T>;
  schema?: K;
  constantly?:
    | {
        use: true;
        notifications: WebSocketNotification[];
      }
    | {
        use: false;
      };
};

export const useFetch = <T extends Service, K extends z.ZodSchema>(name: string, options: Options<T, K>) => {
  const [data, setData] = useState<z.infer<K>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const responce = await options.service(...(options.params || []));
      if (options.schema) {
        const result = options.schema.safeParse(responce.data);
        if (result.success) setData(result.data);
        else setError(result.error);
      }
    } catch (error) {
      if (error instanceof Error) setError(error);
      else setError(new Error(`Unexpected error when trying to fetch ${name}!`));
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    setError(null);
    fetch();

    if (options.constantly?.use) {
      options.constantly.notifications.forEach((notification) => {
        WsNotification.getInstance().on(notification, fetch);
      });
    }
  }, [name]);

  return { data, loading, error };
};
