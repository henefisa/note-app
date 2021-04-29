import React from "react";

import {
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "../Button/Button";

import "./TitleBar.styles.less";
import Space from "../Space/Space";

const TitleBar: React.FC = () => {
  return (
    <div className="title-bar">
      <div className="title-bar__left">
        <Button ghost>
          <PlusOutlined />
        </Button>
      </div>
      <div className="title-bar__right">
        <Space>
          <Button ghost>
            <SettingOutlined />
          </Button>
          <Button ghost>
            <CloseOutlined />
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default React.memo(TitleBar);
