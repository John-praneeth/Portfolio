import { lazy, Suspense } from "react";
import "./App.css";

import { Analytics } from "@vercel/analytics/react";

const MainContainer = lazy(() => import("./components/MainContainer"));
const CharacterModel = lazy(() => import("./components/Character"));

const App = () => {
  return (
    <main className="main-active">
      <Suspense>
        <MainContainer>
          <Suspense>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
      <Analytics />
    </main>
  );
};

export default App;
