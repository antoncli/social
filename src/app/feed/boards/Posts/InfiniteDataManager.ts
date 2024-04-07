import { WebSocketNotification } from "@/services/enums/WebSocketNotification";
import WsNotification from "@/services/websocket/WsNotification";
import { z } from "zod";

const IdSChema = z.array(z.object({ id: z.string() }));

type Service = (page: number, limit: number) => any;
type Context<T, K extends typeof IdSChema> = {
  service: T;
  schema: K;
  constantly?:
    | {
        use: true;
        notifications: WebSocketNotification[];
      }
    | {
        use: false;
      };
  loading?: (loading: boolean) => void;
  newDataOnStart?: (data: z.infer<K>) => void;
  newDataOnEnd?: (data: z.infer<K>) => void;
  error?: (error: unknown) => void;
};

export default class InfiniteDataManager<T extends Service, K extends typeof IdSChema> {
  private _context: Context<T, K>;
  private _data: z.infer<K> = [];
  private _newPostsFetching: boolean = false;

  constructor(context: Context<T, K>) {
    this._context = context;
    WsNotification.getInstance().on(WebSocketNotification.postAdded, () => {
      if (!this._newPostsFetching) this._newPost;
    });
    WsNotification.getInstance().on(WebSocketNotification.postDeleted, () => {});
  }

  fetchEnd = async () => {
    console.log("fetchEnd");
    const page = Math.floor(this._data.length / 20) + 1;
    const data = await this._fetch(page, 20);

    if (!this._data.length) {
      this._data.push(...data);
      this._context.newDataOnEnd?.(this._data);
      return;
    }

    const index = data.findIndex((d) => d.id === this._data.at(-1)!.id);
    if (index === -1) {
      this._data.push(...data);
      this._context.newDataOnEnd?.(this._data);
      return;
    }

    this._data.push(...data.slice(index + 1, data.length));
    this._context.newDataOnEnd?.(this._data);
  };

  private _newPost = async () => {
    this._newPostsFetching = true;
    const tempData = [];
    let page = 1;
    while (true) {
      const data = await this._fetch(page++, 20);
      if (!this._data.length) {
        this._data.push(...data);
        break;
      }
      const index = data.findIndex((d) => d.id === this._data[0].id);
      if (index === -1) {
        tempData.push(...data);
      } else {
        tempData.push(...data.slice(1, index - 1));
        this._data.unshift(...tempData);
        this._context.newDataOnStart?.(this._data);
        break;
      }
    }
    this._newPostsFetching = false;
  };

  private _fetch = async (page: number, limit: number): Promise<z.infer<K>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const responce = await this._context.service(page, limit);
        const result = this._context.schema.safeParse(responce.data);
        if (result.success) resolve(result.data);
        else reject(result.error);
      } catch (err) {
        if (err instanceof Error) reject(err);
        else reject(new Error(`Unexpected error when trying to fetch data!`));
      }
    });
  };
}
