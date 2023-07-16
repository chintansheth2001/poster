import React, { lazy, Suspense } from "react";
import "./App.css";

const Listing = lazy(() => import("./components/Listing"));

function App() {
  return (
    <>
      <div className="app">
        <Suspense fallback={<h2>Still Loading…</h2>}>
          <Listing />
        </Suspense>
      </div>
    </>
  );
}

export default App;
