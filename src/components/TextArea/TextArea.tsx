import React from "react";

import "./TextArea.styles.less";

interface TextAreaProps {
  defaultValue?: string;
  placeholder?: string;
  spellCheck?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  defaultValue,
  placeholder = "Take a note...",
  spellCheck = false,
  onChange,
}) => {
  return (
    <textarea
      className="textarea"
      defaultValue={defaultValue}
      placeholder={placeholder}
      spellCheck={spellCheck}
      onChange={onChange}
    />
  );
};

export default React.memo(TextArea);
