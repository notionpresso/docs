"use client";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
const useIsMobile = () => {
  const cookies = useCookies();
  const [mobile, setMobile] = useState(() => {
    return cookies.get("viewport") === "mobile";
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return mobile;
};

export default useIsMobile;
