import { useLayoutEffect, useRef, useState } from "react";

/* The scale that fits a device frame (its TRUE size, lib/devices.ts) into the stage element `stageRef` is put on: never up past 1:1.
   Shared by the live Preview tab (ToolFrame.tsx) and the HTML preview tab (HtmlPreview.tsx). */
export function useFitScale(dev: { w: number; h: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    /* client*, not a rect: a scrollbar's gutter would otherwise feed back into the fit and the scale would flicker */
    const fit = () => setScale(Math.max(0.05, Math.min((el.clientWidth - 24) / dev.w, (el.clientHeight - 40) / dev.h, 1)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dev.w, dev.h]);
  return { stageRef, scale };
}
