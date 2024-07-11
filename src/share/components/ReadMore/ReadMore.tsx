import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import ReadMoreButton from "@/share/ui/ReadMoreButton/ReadMoreButton";

type Props = {
  text: string;
  maxHeight?: number;
};

export default function ReadMore({ text, maxHeight = 100 }: Props) {
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    if (!textSpanRef.current) return;
    textSpanRef.current.style.height = "1px";
    const height = textSpanRef.current.scrollHeight;

    if (height > maxHeight && !showAll) {
      textSpanRef.current.style.height = maxHeight - 2 + "px";
      setReadMore(true);
      return;
    }

    textSpanRef.current.style.height = textSpanRef.current.scrollHeight + "px";
  }, [textSpanRef.current, text, showAll]);

  const handleOnClick = () => {
    setShowAll(!showAll);
  };

  return (
    <article role='article' className={styles.comment}>
      <span ref={textSpanRef} className={styles.text}>
        {text}
      </span>
      {readMore ? <ReadMoreButton showLess={showAll} onClick={handleOnClick} /> : null}
    </article>
  );
}
