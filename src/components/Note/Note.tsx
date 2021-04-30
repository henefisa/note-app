import React, { useMemo } from "react";
import { MoreOutlined } from "@ant-design/icons";
import Dropdown from "../Dropdown/Dropdown";

import "./Note.styles.less";

interface NoteProps {
  content: string;
  date: string;
}

const Note: React.FC<NoteProps> = ({ content, date }) => {
  const menus = useMemo(() => {
    return [
      {
        title: "Open note",
      },
      {
        title: "Delete note",
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
