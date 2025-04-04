import { ModifyActions } from "./action";
import {
  ALL_STATE,
  WIDGET,
  MODIFY_ELEMENT,
  MODIFY_WIDGET,
  SELECT_ELEMENT,
  ADD_ELEMENT,
  DELETE_ELEMENT,
} from "./type";
import elementsConfig from "@src/core/config/elements";
import { widgetConfig } from "@src/core/config/base";

export const initialState: ALL_STATE = {
  widget: {
    name: "未命名微件",
    url: "",
    id: "",
    createTime: "",
    type: "text",
    count: 0,
    x: 0,
    y: 0,
    column: 1,
    row: 1,
    configuration: {},
    elements: [],
    widgetId: "",
  },
  elementId: undefined,
  widgetId: undefined,
};

export const widgetReducer = (state = initialState, action: ModifyActions) => {
  const copy: ALL_STATE = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // 获取微件x
    case WIDGET: {
      copy.widget = {
        ...action.data,
        configuration: {
          configureValue:
            action.data?.configuration?.configureValue ||
            widgetConfig.configureValue,
          dataValue:
            action.data?.configuration?.dataValue || widgetConfig.dataValue,
        },
      };
      copy.widgetId = action.data.widgetId;
      return copy;
    }
    case MODIFY_WIDGET: {
      copy.widget = {
        ...copy.widget,
        ...action.data,
      };
      return copy;
    }
    case ADD_ELEMENT: {
      if (elementsConfig[action.data.code]) {
        copy.widget.elements.push({
          ...action.data,
          configuration: {
            configureValue: elementsConfig[action.data.code].configureValue,
            dataValue: elementsConfig[action.data.code].dataValue,
          },
        });
        copy.elementId = action.data.elementId;
      } else {
        console.log("组件配置不存在，请仔细检查");
      }

      return copy;
    }

    case DELETE_ELEMENT: {
      copy.widget.elements = copy.widget.elements.filter(
        (item) => item.elementId !== action.id
      );
      if (action.id === copy.elementId) {
        copy.elementId = "";
      }
      return copy;
    }

    case MODIFY_ELEMENT: {
      const index = copy.widget.elements.findIndex(
        (item) => item.elementId === action.data.elementId
      );
      if (index !== -1) {
        copy.widget.elements[index] = {
          ...copy.widget.elements[index],
          ...action.data,
        };
        copy.elementId = action.data.elementId;
      }
      return copy;
    }

    case SELECT_ELEMENT: {
      copy.elementId = action.id;
      return copy;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
