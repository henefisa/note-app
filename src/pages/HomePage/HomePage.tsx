import { Button, Content, Note, Search, TitleBar } from "@/components";
import { BROADCAST } from "@/constants/BROADCAST";
import { notesStore } from "@/stores/notes.store";
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
  const bc = new BroadcastChannel(BROADCAST.NOTE);

  console.log(notes);

  useEffect(() => {
    bc.addEventListener("message", (event) => {
      switch (event.data.type) {
        case "save":
          notesStore.editNote({
            id: event.data.id,
            content: event.data.content,
          });
          break;
        default:
          break;
      }
    });

    return () => {
      bc.close();
    };
  });

  useEffect(() => {
    notesStore.subscribe(setNotes);
    notesStore.init();
  }, []);

  const handleNewNote = () => {
    notesStore.newNote();
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
