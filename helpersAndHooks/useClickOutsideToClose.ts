import { useEffect, useCallback } from "react";

export function useClickOutsideToClose<T>(
  closeFunc: (arg: boolean) => void,
  ...refs: React.RefObject<T>[]
) {
  const close = useCallback(
    (e: MouseEvent) => {
      const refClicked = refs.some(el => el.current === e.target);
      if (refClicked) return;
      closeFunc(false);
    },
    [closeFunc, refs]
  );

  useEffect(() => {
    document.body.addEventListener("click", close);

    return () => document.body.removeEventListener("click", close);
  }, [close]);
}
