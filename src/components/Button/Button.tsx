import React from "react";
import clsx from "clsx";

import "./Button.styles.less";

interface ButtonProps {
  children: React.ReactNode;
  type?: "primary" | "default";
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ghost?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "default",
  icon,
  className,
  style,
  ghost
}) => {
  const isDefault = type === "default";

  return (
    <button
      className={clsx(
        "btn",
        !isDefault && `btn--${type}`,
        ghost && `btn--ghost`,
        className
      )}
      style={style}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__content">{children}</span>
    </button>
  );
};

export default React.memo(Button);
