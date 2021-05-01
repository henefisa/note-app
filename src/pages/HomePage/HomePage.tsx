import React from "react";
import { remote, ipcRenderer } from "electron";

import {
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "./HomePage.styles.less";
import { Button, Note, Search, TitleBar, Content } from "@/components";

const HomePage: React.FC = () => {
  const handleNewNote = () => {
    ipcRenderer.invoke("create-note");
  };

  const handleCloseWindow = () => {
    const window = remote.getCurrentWindow();
    window.close();
  };

  return (
    <div className="home-page">
      <TitleBar
        left={
          <Button ghost onClick={handleNewNote}>
            <PlusOutlined />
          </Button>
        }
        right={
          <>
            <Button ghost>
              <SettingOutlined />
            </Button>
            <Button ghost onClick={handleCloseWindow}>
              <CloseOutlined />
            </Button>
          </>
        }
      />
      <Content>
        <h1 className="home-page__title">Notes</h1>
        <Search />
        <div className="notes-container">
          <Note content="Sample note here" date="Mar 13" key="1" />
          <Note content="Sample note here" date="Mar 13" key="2" />
          <Note content="Sample note here" date="Mar 13" key="3" />
          <Note content="Sample note here" date="Mar 13" key="4" />
        </div>
      </Content>
    </div>
  );
};

export default React.memo(HomePage);
