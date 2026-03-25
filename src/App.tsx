import { lazy, Suspense } from "react";
import "./App.css";

import CharacterModel from "./components/Character";
import { LoadingProvider } from "./context/LoadingProvider";
import { Analytics } from "@vercel/analytics/react";

const MainContainer = lazy(() => import("./components/MainContainer"));

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
