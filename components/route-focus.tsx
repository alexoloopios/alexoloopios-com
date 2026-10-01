"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteFocus() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const frame = requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("main h1")?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
