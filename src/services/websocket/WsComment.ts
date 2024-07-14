import { io } from "socket.io-client";
import Evented from "@share/classes/Evented";
import { CommentEvent } from "@services/enums/CommentEvent";
import { z } from "zod";

type Event = {
  [CommentEvent.commentAdded]: string;
  [CommentEvent.commentEdited]: string;
  [CommentEvent.commentDeleted]: string;
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

    socket.on(CommentEvent.commentAdded, (payload) => {
      if (!z.string().safeParse(payload).success) return;
      this.emit(CommentEvent.commentAdded, payload);
    });
    socket.on(CommentEvent.commentDeleted, (payload) => {
      if (!z.string().safeParse(payload).success) return;
      this.emit(CommentEvent.commentDeleted, payload);
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    window.addEventListener("beforeunload", () => {
      socket.close();
    });
  }
}
