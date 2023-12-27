"use client";

import { useAuthorized } from "@/share/hooks/useAuthorized";
import SearchHeader from "@/app/feed/components/SearchHeader/SearchHeader";

export default function Feed() {
  useAuthorized();

  return (
    <div>
      <SearchHeader />
    </div>
  );
}
