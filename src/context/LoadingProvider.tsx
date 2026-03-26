import { PropsWithChildren, useMemo, useState } from "react";
import { LoadingContext } from "./loadingContext";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading]
  );

  return (
    <LoadingContext.Provider value={value}>
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};
