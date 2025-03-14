import React, { FC } from "react";
import elements from "@src/elements";
import { capitalizeFirstLetter } from "@src/utils";

interface IRenderElementProps {
  data: IAnyObject;
  realData?: IAnyObject;
}

const RenderElement: FC<IRenderElementProps> = ({ data, realData }) => {
  if (data.element && elements[capitalizeFirstLetter(data.element)]) {
    return React.createElement(elements[capitalizeFirstLetter(data.element)], {
      options: data.configuration.configureValue,
      data: data.configuration?.dataValue?.useInterface
        ? realData || {}
        : data.configuration?.dataValue?.mock,
      field: data.configuration?.dataValue?.field,
      other: {
        // 表单变化时向外传递的函数
        onChangeHandler: (value: any) => {
          console.log(value, "onChangeHandler");
        },
        // 接口参数
        params: data.configuration?.dataValue?.params || {},
        // 表单组件值需要保存的字段名，即params接口参数里的字段名
        paramName: data.configuration?.dataValue?.paramsName,
      },
    });
  }
  return <div>你访问的组件不存在请联系售后人员</div>;
};

export default RenderElement;
