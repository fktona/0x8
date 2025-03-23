"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
export function NavigationProgress() {
  return (
    <ProgressBar
      options={{ showSpinner: false }}
      //   shallowRouting
      //   style="style"
    />
  );
}
