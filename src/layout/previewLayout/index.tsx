import React, { FC, HtmlHTMLAttributes, ReactNode } from "react";
import "./index.scss";
import { getStyles } from "@src/utils";
interface IPreviewLayout extends HtmlHTMLAttributes<HTMLDivElement> {
  data: IAnyObject;
  header: ReactNode;
  body: ReactNode;
}

const PreviewLayout: FC<IPreviewLayout> = ({
  data,
  header,
  body,
  id,
  style,
}) => {
  return (
    <div
      className="cms-preview-layout"
      style={{
        ...getStyles(data?.configuration?.configureValue || {}),
        ...style,
      }}
      id={id}
    >
      {data?.configuration?.configureValue?.headerShow ? (
        <div
          className="cms-preview-layout__header"
          style={getStyles(
            data?.configuration?.configureValue || {},
            "headerStyle"
          )}
        >
          {header}
        </div>
      ) : null}
      <div
        className="cms-preview-layout__body"
        style={getStyles(
          data?.configuration?.configureValue || {},
          "bodyStyle"
        )}
      >
        {body}
      </div>
    </div>
  );
};

export default PreviewLayout;
