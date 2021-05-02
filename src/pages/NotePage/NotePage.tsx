import { Button, Content, TextArea, TitleBar } from "@/components";
import {
  CloseOutlined,
  MoreOutlined,
  PlusOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import "./NotePage.styles.less";


const NotePage: React.FC = () => {
  const [data, setData] = useState<any>();
  const { params } = useRouteMatch<{ id: string }>();

  useEffect(() => {
    (async () => {
      const data = await ipcRenderer.invoke("get-note", { $id: params.id });
      setData(data);
    })();
  }, []);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, content: e.target.value });
  };

  const handleSave = () => {
    ipcRenderer.invoke("update-note", {
      $id: data?.id,
      $content: data?.content,
    });
  };

  const handleClose = () => {
    ipcRenderer.invoke("close-window");
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
              <SaveOutlined onClick={handleSave} />
            </Button>
            <Button ghost>
              <MoreOutlined />
            </Button>
            <Button ghost>
              <CloseOutlined onClick={handleClose} />
            </Button>
          </>
        }
      />
      <Content padding={false}>
        <div className="note">
          <TextArea onChange={handleTextAreaChange} value={data?.content} />
        </div>
      </Content>
    </div>
  );
};

export default React.memo(NotePage);
