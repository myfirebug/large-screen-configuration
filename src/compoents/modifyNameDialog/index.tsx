import React, { FC } from "react";
import {
  Modal,
  ModalProps,
  Form,
  type FormProps,
  Input,
  Button,
  message,
} from "antd";
import { PAGETYPENAME } from "@src/core/enums/access.enums";

interface IModifyNameDialog extends ModalProps {
  onClose: () => void;
  // 名称
  name: string;
  // 类型
  pageType: PageType;
  // 修改名称成功函数
  modifyNameSuccessHander?: (name: string) => void;
}

type FieldType = {
  name: string;
};

const ModifyNameDialog: FC<IModifyNameDialog> = ({
  name,
  open,
  onClose,
  pageType,
  modifyNameSuccessHander,
}) => {
  console.log(pageType, "pageType");
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    modifyNameSuccessHander?.(values.name);
    message.success("保存成功");
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
      title={`${name ? "修改" : "新增"}${PAGETYPENAME[pageType]}名称`}
      destroyOnClose
    >
      <Form
        onFinish={onFinish}
        initialValues={{ name: name || "" }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="name"
          rules={[
            { required: true, message: `请输入${PAGETYPENAME[pageType]}名称` },
          ]}
        >
          <Input placeholder={`请输入${PAGETYPENAME[pageType]}名称`} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModifyNameDialog;
