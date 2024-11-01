import { useEffect, RefObject } from "react";

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>;
  handler: () => void;
}

export function useClickOutside({ ref, handler }: UseClickOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

export default useClickOutside;
