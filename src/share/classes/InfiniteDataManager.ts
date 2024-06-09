import { WebSocketNotification } from "@/services/enums/WebSocketNotification";
import { z } from "zod";

const IdSchema = z.array(z.object({ id: z.string() }));

type Context<T extends typeof IdSchema> = {
  service: (page: number, limit: number) => any;
  schema: T;
  constantly?:
    | {
        use: true;
        notifications: WebSocketNotification[];
      }
    | {
        use: false;
      };
  loading?: (loading: boolean) => void;
  update?: (data: z.infer<T>) => void;
  error?: (error: unknown) => void;
};

export default class InfiniteDataManager<T extends typeof IdSchema> {
  private _context: Context<T>;
  private _data: z.infer<T> = [];
  private _newDataFetching: boolean = false;

  constructor(context: Context<T>) {
    this._context = context;
  }

  dataAdded = () => {
    if (!this._newDataFetching) this._newData();
  };

  dataDeleted = async (id: string) => {
    const index = this._data.findIndex((entity) => entity.id === id);
    this._data.splice(index, 1);
    this._context.update?.(this._data);
  };

  fetchEnd = async () => {
    const page = Math.floor(this._data.length / 20) + 1;
    const data = await this._fetch(page, 20);

    if (!this._data.length) {
      this._data.push(...data);
      this._context.update?.(this._data);
      return;
    }

    const index = data.findIndex((d) => d.id === this._data.at(-1)!.id);
    if (index === -1) {
      this._data.push(...data);
      this._context.update?.(this._data);
      return;
    }

    this._data.push(...data.slice(index + 1, data.length));
    this._context.update?.(this._data);
  };

  private _newData = async () => {
    this._newDataFetching = true;
    const tempData = [];
    let page = 1;
    while (true) {
      const data = await this._fetch(page++, 5);
      if (!this._data.length) {
        this._data.push(...data);
        break;
      }

      const index = data.findIndex((d) => d.id === this._data[0].id);
      if (index === -1) {
        tempData.push(...data);
      } else {
        tempData.push(...data.slice(index - 1, 1));
        this._data.unshift(...tempData);
        this._context.update?.(this._data);
        break;
      }
    }
    this._newDataFetching = false;
  };

  private _fetch = async (page: number, limit: number): Promise<z.infer<T>> => {
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
