import { Button, Content, Note, Search, TitleBar } from "@/components";
import {
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import "./HomePage.styles.less";

const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const notes = await ipcRenderer.invoke("get-all-notes");
      setNotes(notes);
    })();
  }, []);

  const handleNewNote = () => {
    ipcRenderer.invoke("new-note");
  };

  const handleCloseWindow = () => {
    ipcRenderer.invoke("close-window");
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
          {notes.map((note) => (
            <Note
              id={note.id}
              content={note.content}
              date={note.createdAt}
              key={note.id}
            />
          ))}
        </div>
      </Content>
    </div>
  );
};

export default React.memo(HomePage);
