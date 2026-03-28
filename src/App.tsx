import { lazy, Suspense } from "react";
import "./App.css";

import { LoadingProvider } from "./context/LoadingProvider";
import { Analytics } from "@vercel/analytics/react";

const MainContainer = lazy(() => import("./components/MainContainer"));
const CharacterModel = lazy(() => import("./components/Character"));

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
        <Analytics />
      </LoadingProvider>
    </>
  );
};

export default App;
