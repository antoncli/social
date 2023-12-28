import { useAppSelector, useAppStore } from "@/lib/hooks";

export default function Board() {
  const data = useAppSelector((state) => state.boards.boards);

  return <div></div>;
}
