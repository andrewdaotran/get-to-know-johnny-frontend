import { useEffect, useState } from "react";

export const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setScrollPos(window.scrollY);
      });
    }
  }, []);
  return { scrollPos };
};
