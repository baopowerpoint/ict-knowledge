"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface DrawerState {
  slug: string | null;
  open: (slug: string) => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerState>({
  slug: null,
  open: () => {},
  close: () => {},
});

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const open = useCallback((s: string) => setSlug(s), []);
  const close = useCallback(() => setSlug(null), []);
  return (
    <DrawerContext.Provider value={{ slug, open, close }}>
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawer = () => useContext(DrawerContext);
