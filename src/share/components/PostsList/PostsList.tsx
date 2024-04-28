import Post from "@share/components/Post/Post";
import styles from "@share/components/PostsList/styles.module.css";
import { Post as TPost } from "@schemas/PostSchema";
import { PostRowsOptions } from "@share/types/PostRowsOptions";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { memo, useEffect, useRef, useState } from "react";
import ScrollToButton from "@share/ui/ScrollToButton/ScrollToButton";

type Props = {
  data: TPost[];
  rowsOptions?: PostRowsOptions;
  onEndReached?: (index: number) => void;
};

export default memo(function PostsList({ data, rowsOptions, onEndReached }: Props) {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const [prevFirstPostId, setPrevFirstPostId] = useState<string | undefined>(undefined);
  const [isNewData, setIsNewData] = useState<boolean>(false);
  const [atTop, setAtTop] = useState<boolean>(true);

  useEffect(() => {
    setPrevFirstPostId(data[0]?.id);
    if (!atTop && !isNewData && data[0]?.id != null && prevFirstPostId != null && data[0]?.id !== prevFirstPostId)
      setIsNewData(true);
  }, [data]);

  const scrollToTop = () => {
    if (!virtuoso.current) return;
    virtuoso.current.scrollToIndex({
      index: 0,
      align: "start",
      behavior: "smooth",
    });
    setIsNewData(false);
  };

  return (
    <div className={styles.container}>
      {!atTop && isNewData ? (
        <div className={styles.scrollToButton}>
          <ScrollToButton onClick={scrollToTop} />
        </div>
      ) : null}
      {data.length ? (
        <Virtuoso
          ref={virtuoso}
          totalCount={data.length}
          endReached={onEndReached}
          atTopStateChange={setAtTop}
          itemContent={(index) => (
            <div style={{ marginBottom: "8px" }}>
              <Post key={data[index].id} post={data[index]} rowsOptions={rowsOptions} />
            </div>
          )}
        />
      ) : null}
    </div>
  );
});
