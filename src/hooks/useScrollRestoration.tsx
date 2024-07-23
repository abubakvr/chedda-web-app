// hooks/useScrollRestoration.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [scrollPositions, setScrollPositions] = useState<{
    [url: string]: number;
  }>({});
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      const currentUrl = `${pathname}?${searchParams.toString()}`;
      setScrollPositions((prev) => ({
        ...prev,
        [currentUrl]: window.scrollY,
      }));
    };

    const handleRouteChangeComplete = () => {
      const currentUrl = `${pathname}?${searchParams.toString()}`;
      const scrollPosition = scrollPositions[previousUrlRef.current || ""] || 0;
      window.scrollTo(0, scrollPosition);
      previousUrlRef.current = currentUrl;
    };

    window.addEventListener("beforeunload", handleRouteChangeStart);
    window.addEventListener("popstate", handleRouteChangeComplete);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart);
      window.removeEventListener("popstate", handleRouteChangeComplete);
    };
  }, [pathname, searchParams, scrollPositions]);

  useEffect(() => {
    const currentUrl = `${pathname}?${searchParams.toString()}`;
    previousUrlRef.current = currentUrl;
  }, [pathname, searchParams]);
}
