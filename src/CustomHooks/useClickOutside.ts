import { useEffect, useRef } from "react";
let useClickOutside = (handler: () => void) => {
  let domNode = useRef<HTMLElement | null>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (domNode.current && !domNode.current.contains(event.target as Node))
        handler();
    };

    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};
export default useClickOutside;
