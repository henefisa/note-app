import React from "react";

import Note from "@/components/Note/Note";
import Search from "@/components/Search/Search";
import TitleBar from "@/components/TitleBar/TitleBar";
import Button from "@/components/Button/Button";
import {
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "./HomePage.styles.less";
import Content from "@/components/Content/Content";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <TitleBar
        left={
          <Button ghost>
            <PlusOutlined />
          </Button>
        }
        right={
          <>
            <Button ghost>
              <SettingOutlined />
            </Button>
            <Button ghost>
              <CloseOutlined />
            </Button>
          </>
        }
      />
      <Content>
        <h1 className="home-page__title">Notes</h1>
        <Search />
        <div className="notes-container">
          <Note content="Sample note here" date="Mar 13" />
          <Note content="Sample note here" date="Mar 13" />
          <Note content="Sample note here" date="Mar 13" />
          <Note content="Sample note here" date="Mar 13" />
        </div>
      </Content>
    </div>
  );
};

export default React.memo(HomePage);
