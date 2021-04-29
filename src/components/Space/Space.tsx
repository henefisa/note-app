import clsx from "clsx";
import React from "react";

import "./Space.styles.less";

interface SpaceProps {
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Space: React.FC<SpaceProps> = ({
  direction = "horizontal",
  children,
}) => {
  const Children = React.Children.map(children, (child) => (
    <div className="space__child">{child}</div>
  ));

  return <div className={clsx("space", `space--${direction}`)}>{Children}</div>;
};

export default React.memo(Space);
