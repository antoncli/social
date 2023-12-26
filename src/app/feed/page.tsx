"use client";

import Header from "@/share/components/Header/Header";
import { useAuthorized } from "@/share/hooks/useAuthorized";

export default function Feed() {
  useAuthorized();

  return (
    <div>
      <Header pageName='Feed' />
    </div>
  );
}
