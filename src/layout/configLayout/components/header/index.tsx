import React, { FC, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import ModifyNameDialog from "./components/modifyNameDialog";

interface IConfigLayoutHeader {
  // 类型
  pageType: PageType;
  // 名称
  name?: string;
  // 页面logo
  logo?: string;
  // 预览函数
  previewHandler?: () => void;
  // 发布函数
  publishHandler?: () => void;
  // 修改名称成功函数
  modifyNameSuccessHander?: (name: string) => void;
}

export const ConfigLayoutHeader: FC<IConfigLayoutHeader> = ({
  name,
  logo,
  pageType,
  modifyNameSuccessHander,
  previewHandler,
  publishHandler,
}) => {
  console.log(name, "namenamename");
  const navigate = useNavigate();
  const [isModalNameOpen, setIsModalNameOpen] = useState(false);
  return (
    <>
      <div className="cms-config-layout__header">
        <div className="cms-config-layout__header--left">
          <span
            className="cms-icon logo"
            dangerouslySetInnerHTML={{ __html: logo || "&#xe625;" }}
          ></span>
          <h1 className="name">{name}</h1>
          <span
            className="cms-icon edit"
            onClick={() => setIsModalNameOpen(true)}
          >
            &#xec88;
          </span>
        </div>
        <div className="cms-config-layout__header--right">
          <div className="preview" onClick={previewHandler}>
            <i className="cms-icon">&#xe668;</i>预览
          </div>
          <div className="publish" onClick={publishHandler}>
            <i className="cms-icon">&#xe620;</i>发布
          </div>
          <div className="preview" onClick={() => navigate(-1)}>
            <i className="cms-icon">&#xe720;</i>返回
          </div>
        </div>
      </div>
      <ModifyNameDialog
        name={name || ""}
        pageType={pageType}
        open={isModalNameOpen}
        onClose={() => setIsModalNameOpen(false)}
        modifyNameSuccessHander={modifyNameSuccessHander}
      ></ModifyNameDialog>
    </>
  );
};
