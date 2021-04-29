import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import Button from "./components/Button/Button";
import Space from "./components/Space/Space";
import TitleBar from "./components/TitleBar/TitleBar";

const App: React.FC = () => {
  return (
    <div className="app">
      <TitleBar />
    </div>
  );
};

export default React.memo(App);
