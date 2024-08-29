import type { ForwardRefFn } from "./token";

import { InjectionToken } from "./token";

export function forwardRef(cb: ForwardRefFn) {
  return () => cb();
}
