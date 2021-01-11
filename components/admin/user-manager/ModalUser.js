import { Form, Modal, Input, Radio } from 'antd';
import React, { useEffect } from "react";
import { createUser, editUser } from '../../../utils/api-services/user-services'

export default function ModalUser({ visible, user, setVisible, setResetTable }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user)
  }, [user])

  return <Modal title={user ? "Edit User" : "Add New User"}
    visible={visible}
    style={{ top: 20 }}
    width={620}
    onCancel={() => { form.resetFields(); setVisible(false) }}
    onOk={() => {
      form
        .validateFields()
        .then(async (values) => {
          try {
            const response = user ? await editUser(user.id, values) : createUser(values);
            if (response.success) {
              Modal.success({
                content: `Successfully ${user ? "edit" : "create"} user ${values.user_name}`
              });
              setResetTable(new Date());
              setVisible(false);
              form.resetFields();
            } else {
              Modal.error({
                content: `${response.message}`
              });
            }
          } catch (error) {
            throw error;
          }
        })
    }}
  >
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
    >
      <Form.Item
        name="user_name"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input the user name !',
          },
          {
            min: 5,
            message: 'Please input the user name >= 5 characters !',
          }
        ]}
      >
        <Input disabled={user ? true : false} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input the password !',
          },
          {
            min: 6,
            message: 'Please input the password >= 6 characters !',
          }
        ]}
      >
        <Input type="password" placeholder="Enter new password here !" />
      </Form.Item>
      <Form.Item
        name="name"
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input the name !',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="organize"
        label="Organize"
        rules={[
          {
            required: true,
            message: 'Please input the Organize !',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
      >
        <Input />
      </Form.Item>
      <Form.Item name="role" style={{ marginBottom: 0, textAlign: "center" }} >
        <Radio.Group>
          <Radio value="staff">Staff</Radio>
          <Radio value="admin">Admin</Radio>
          <Radio value="police">Police</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  </Modal >
}