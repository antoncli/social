export function detectOnClickOutside(element: HTMLElement, onOutside: () => void): () => void {
  const outsideClickListener = (event: any) => {
    if (!element.contains(event.target) && isVisible(element)) {
      onOutside();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  document.addEventListener("click", outsideClickListener);

  return removeClickListener;
}

const isVisible = (elem: any) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
