import React from "react";
import { Button, Content, TextArea, TitleBar } from "@/components";
import { CloseOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";

import "./NotePage.styles.less";

const NotePage: React.FC = () => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="note-page">
      <TitleBar
        left={
          <Button ghost>
            <PlusOutlined />
          </Button>
        }
        right={
          <>
            <Button ghost>
              <MoreOutlined />
            </Button>
            <Button ghost>
              <CloseOutlined />
            </Button>
          </>
        }
      />
      <Content padding={false}>
        <div className="note">
          <TextArea onChange={handleTextAreaChange} />
        </div>
      </Content>
    </div>
  );
};

export default React.memo(NotePage);
