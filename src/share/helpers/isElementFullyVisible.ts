export const isElementFullyVisible = (element: HTMLElement): boolean => {
  const elementRect = element.getBoundingClientRect();
  console.log(elementRect.bottom);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const inViewport =
    elementRect.top >= 0 && elementRect.left >= 0 && elementRect.bottom <= windowHeight && elementRect.right <= windowWidth;

  if (!inViewport) {
    return false;
  }

  let parent = element.parentElement;
  while (parent) {
    console.log(parent);
    const parentRect = parent.getBoundingClientRect();
    console.log(parentRect.bottom);
    const inParent =
      elementRect.top >= parentRect.top &&
      elementRect.left >= parentRect.left &&
      elementRect.bottom <= parentRect.bottom &&
      elementRect.right <= parentRect.right;

    if (!inParent) {
      return false;
    }

    parent = parent.parentElement;
  }

  return true;
};
