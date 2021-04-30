import React from "react";
// import { remote } from "electron";

import {
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "../Button/Button";
import Space from "../Space/Space";

import "./TitleBar.styles.less";

interface TitleBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const TitleBar: React.FC<TitleBarProps> = ({ left, right }) => {
  // const handleClose = () => {
  //   const window = remote.getCurrentWindow();
  //   window.close();
  // };

  return (
    <div className="title-bar">
      <div className="title-bar__left">
        <Space>{left}</Space>
      </div>
      <div className="title-bar__right">
        <Space>{right}</Space>
      </div>
    </div>
  );
};

export default React.memo(TitleBar);
