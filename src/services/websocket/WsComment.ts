import { io } from "socket.io-client";
import Evented from "@share/classes/Evented";
import { CommentEvent } from "@services/enums/CommentEvent";

type Event = {
  [CommentEvent.commentAdded]: undefined;
  [CommentEvent.commentDeleted]: undefined;
};

export default class WsComment extends Evented<Event> {
  constructor(owner: string) {
    super();
    const socket = io(`${process.env.API_URL}/comment`, {
      path: "/socket.io",
      query: {
        token: localStorage.getItem("access_token") || "",
        owner,
      },
      transports: ["websocket"],
      multiplex: false,
    });

    socket.on(CommentEvent.commentAdded, () => this.emit(CommentEvent.commentAdded, undefined));
    socket.on(CommentEvent.commentDeleted, () => this.emit(CommentEvent.commentDeleted, undefined));

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    window.addEventListener("beforeunload", () => {
      socket.close();
    });
  }
}
