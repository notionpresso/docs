"use client";

import isMobile from "@/lib/is-mobile";
import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const checkIsMobile = () => {
      setMobile(isMobile());
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return mobile;
};

export default useIsMobile;
