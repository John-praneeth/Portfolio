import { PropsWithChildren, useMemo, useState } from "react";
import { LoadingContext } from "./loadingContext";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      progress,
      setProgress,
    }),
    [isLoading, progress]
  );

  return (
    <LoadingContext.Provider value={value}>
      <main className="main-active">{children}</main>
    </LoadingContext.Provider>
  );
};
