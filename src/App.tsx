import React from "react";
import HomePage from "./pages/HomePage/HomePage";

const App: React.FC = () => {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
};

export default React.memo(App);
