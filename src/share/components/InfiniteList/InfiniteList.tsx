import styles from "@share/components/InfiniteList/styles.module.css";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { ComponentType, useEffect, useRef, useState } from "react";
import ScrollToButton from "@share/ui/ScrollToButton/ScrollToButton";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

type Props<T, K> = {
  data: T[];
  rowsOptions?: K;
  component: ComponentType<{
    data: T;
    rowsOptions?: K;
  }>;
  onEndReached?: (index: number) => void;
};

export default function InfiniteList<T extends { id: string }, K>(props: Props<T, K>) {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const [prevFirstPostId, setPrevFirstPostId] = useState<string | undefined>(undefined);
  const [isNewData, setIsNewData] = useState<boolean>(false);
  const [atTop, setAtTop] = useState<boolean>(true);

  useEffect(() => {
    setPrevFirstPostId(props.data[0]?.id);
    if (!atTop && !isNewData && props.data[0]?.id != null && prevFirstPostId != null && props.data[0]?.id !== prevFirstPostId)
      setIsNewData(true);
  }, [props.data]);

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
      {props.data.length ? (
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={() => false}
              itemCount={props.data.length}
              loadMoreItems={(startIndex, stopIndex) => {
                console.log(stopIndex);
                props.onEndReached?.(stopIndex);
              }}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={props.data.length}
                  itemSize={122}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  {...props}
                >
                  {({ index }) => {
                    return (
                      <div style={{ marginBottom: "8px" }}>
                        <props.component data={props.data[index]} rowsOptions={props.rowsOptions} />
                      </div>
                    );
                  }}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      ) : // <Virtuoso
      //   role='TEST'
      //   ref={virtuoso}
      //   totalCount={props.data.length}
      //   endReached={props.onEndReached}
      //   atTopStateChange={setAtTop}
      //   itemContent={(index) => (
      //     <div style={{ marginBottom: "8px" }}>
      //       <props.component data={props.data[index]} rowsOptions={props.rowsOptions} />
      //     </div>
      //   )}
      // />
      null}
    </div>
  );
}
