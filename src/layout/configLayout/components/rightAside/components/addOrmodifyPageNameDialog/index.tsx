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

interface IAddOrmodifyPageNameDialog extends ModalProps {
  onClose: () => void;
  // 名称
  name: string;
  // 修改名称成功函数
  onFinishHandler?: (name: string) => void;
}

type FieldType = {
  name: string;
};

const AddOrmodifyPageNameDialog: FC<IAddOrmodifyPageNameDialog> = ({
  name,
  open,
  onClose,
  onFinishHandler,
}) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    onFinishHandler?.(values.name);
    message.success("修改成功");
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
      title={`${!name ? "增加" : "修改"}页面`}
      destroyOnClose
    >
      <Form
        onFinish={onFinish}
        initialValues={{ name: name || "" }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="name"
          rules={[{ required: true, message: "请输入页面名称" }]}
        >
          <Input placeholder="请输入页面名称" />
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

export default AddOrmodifyPageNameDialog;
