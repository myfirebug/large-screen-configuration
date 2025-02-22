import { Collapse, Form, FormInstance } from "antd";
import React, { FC } from "react";
import BaseForm from "../baseForm";

const { Panel } = Collapse;

interface IDynamicForm {
  datas: IAnyObject;
  form: FormInstance<any>;
  callback: Function;
}

// 判断数据是Array 或者 object
const judgeType = (data: any, type: string) => {
  return Object.prototype.toString.call(data) === type;
};

const DynamicForm: FC<IDynamicForm> = ({ datas, form, callback }) => {
  return datas.map((item: any, index: number) => {
    if (judgeType(item, "[object Object]")) {
      const relationFields =
        item.relationFields !== undefined ? item.relationFields.split(",") : [];
      return (
        <div key={index}>
          {!relationFields.length ? (
            <BaseForm item={item} form={form} callback={callback} />
          ) : (
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                if (
                  relationFields.every((subItem: string) =>
                    item.relationValues.includes(String(getFieldValue(subItem)))
                  )
                ) {
                  return (
                    <BaseForm item={item} form={form} callback={callback} />
                  );
                }
              }}
            </Form.Item>
          )}
        </div>
      );
    }
    if (judgeType(item, "[object Array]")) {
      return (
        <div key={index}>
          {item.map((subItem: any, subIndex: number) => {
            const relationFields =
              subItem.relationFields !== undefined
                ? subItem.relationFields.split(",")
                : [];
            return (
              <Collapse
                key={subIndex}
                size="small"
                defaultActiveKey={["0-0"]}
                bordered={false}
              >
                {subItem.relationFields === undefined ? (
                  <Panel header={subItem.name} key={`${index}-${subIndex}`}>
                    <DynamicForm
                      datas={subItem.list}
                      form={form}
                      callback={callback}
                    />
                  </Panel>
                ) : (
                  <Form.Item noStyle shouldUpdate>
                    {({ getFieldValue }) => {
                      if (
                        relationFields.every((subbItem: string) =>
                          subItem.relationValues.includes(
                            String(getFieldValue(subbItem))
                          )
                        )
                      ) {
                        return (
                          <Collapse
                            key={subIndex}
                            size="small"
                            bordered={false}
                          >
                            <Panel
                              header={subItem.name}
                              key={`${index}-${subIndex}`}
                            >
                              <DynamicForm
                                datas={subItem.list}
                                form={form}
                                callback={callback}
                              />
                            </Panel>
                          </Collapse>
                        );
                      }
                    }}
                  </Form.Item>
                )}
              </Collapse>
            );
          })}
        </div>
      );
    }
    return null;
  });
};

export default DynamicForm;
