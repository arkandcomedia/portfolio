"use client";

import { createContext, useContext, type RefObject } from "react";
import type Lenis from "lenis";

type LoaderState = {
  /** true once the preloader curtain starts lifting — sections run their intros from here */
  loaded: boolean;
  lenis: RefObject<Lenis | null>;
};

export const LoaderContext = createContext<LoaderState>({
  loaded: false,
  lenis: { current: null },
});

export const useLoader = () => useContext(LoaderContext);
