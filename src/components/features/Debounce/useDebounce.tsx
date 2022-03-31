import {DependencyList, EffectCallback, useEffect} from "react";

export const useDebounce = (
  effect: EffectCallback,
  delay: number,
  deps?: DependencyList
) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};