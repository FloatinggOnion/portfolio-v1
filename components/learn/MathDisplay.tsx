"use client";

import { useEffect, useRef } from "react";

type Props = {
  latex: string;
  display?: boolean;
  className?: string;
};

export function MathDisplay({ latex, display = false, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("katex").then((katex) => {
      if (!cancelled && ref.current) {
        try {
          katex.default.render(latex, ref.current, {
            displayMode: display,
            throwOnError: false,
            output: "html",
          });
        } catch {
          if (ref.current) ref.current.textContent = latex;
        }
      }
    });
    return () => { cancelled = true; };
  }, [latex, display]);

  return display ? (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`block overflow-x-auto py-2 ${className}`} />
  ) : (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`inline ${className}`} />
  );
}
