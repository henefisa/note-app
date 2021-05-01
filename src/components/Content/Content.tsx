import clsx from "clsx";
import React from "react";

import "./Content.styles.less";

interface ContentProps {
  children: React.ReactNode;
  padding?: boolean;
}

const Content: React.FC<ContentProps> = ({ children, padding = true }) => {
  return (
    <div className={clsx("content", !padding && "content--no-padding")}>
      {children}
    </div>
  );
};

export default React.memo(Content);
