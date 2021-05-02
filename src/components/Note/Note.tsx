import React, { useMemo } from "react";
import { MoreOutlined } from "@ant-design/icons";
import Dropdown from "../Dropdown/Dropdown";

import "./Note.styles.less";
import { ipcRenderer } from "electron";

interface NoteProps {
  id: string;
  content: string;
  date: string;
}

const Note: React.FC<NoteProps> = ({ id, content, date }) => {
  const handleOpenNote = () => {
    ipcRenderer.invoke("open-note", { id });
  };

  const handleDeleteNote = () => {
    ipcRenderer.invoke("delete-note", { id });
  };

  const menus = useMemo(() => {
    return [
      {
        title: "Open note",
        onClick: handleOpenNote,
      },
      {
        title: "Delete note",
        onClick: handleDeleteNote,
      },
    ];
  }, []);

  return (
    <div className="note">
      <div className="note__meta">
        <div className="note__date">{date}</div>
        <div className="note__menu">
          <Dropdown items={menus}>
            <MoreOutlined />
          </Dropdown>
        </div>
      </div>
      <div className="note__content">{content}</div>
    </div>
  );
};

export default React.memo(Note);
