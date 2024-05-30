import { io } from "socket.io-client";
import { WebSocketNotification } from "@/services/enums/WebSocketNotification";
import Evented from "@/share/classes/Evented";

type Event = {
  [WebSocketNotification.postAdded]: undefined;
  [WebSocketNotification.postDeleted]: undefined;
};

export default class WsNotification extends Evented<Event> {
  private static _instance: WsNotification;

  private constructor() {
    super();
    const socket = io(`${process.env.API_URL}/notification`, {
      path: "/socket.io",
      query: {
        token: localStorage.getItem("access_token") || "",
      },
      transports: ["websocket"],
      multiplex: false,
    });

    socket.on(WebSocketNotification.postAdded, () => this.emit(WebSocketNotification.postAdded, undefined));
    socket.on(WebSocketNotification.postDeleted, () => this.emit(WebSocketNotification.postDeleted, undefined));

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    window.addEventListener("beforeunload", () => {
      socket.close();
    });
  }

  static getInstance() {
    if (!WsNotification._instance) {
      WsNotification._instance = new WsNotification();
    }
    return WsNotification._instance;
  }
}
