import { useEffect } from "react";
import preventScroll from "@/lib/prevent-scrollbar";

interface UsePreventScrollProps {
  isOpen: boolean;
}

const usePreventScroll = ({ isOpen }: UsePreventScrollProps) => {
  useEffect(() => {
    preventScroll(isOpen);

    return () => {
      preventScroll(false);
    };
  }, [isOpen]);
};

export default usePreventScroll;
