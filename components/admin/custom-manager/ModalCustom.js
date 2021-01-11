import { Form, Modal, Input, Upload, Button } from 'antd';
import React, { useEffect } from "react";
import { createCustom } from '../../../utils/api-services/custom-service'
import { toBase64 } from '../../../utils/helper';
import { UploadOutlined } from '@ant-design/icons';

export default function ModalUser({ visible, setVisible, setReset }) {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e[0];
    }
    return e && e.fileList;
  };

  return <Modal title={"Create new Custom"}
    visible={visible}
    style={{ top: 60 }}
    width={500}
    onCancel={() => { setVisible(false) }}
    onOk={() => {
      form
        .validateFields()
        .then(async (values) => {
          try {
            const image = values.image?.length > 0 ? await toBase64(values.image[0].originFileObj) : undefined;
            const response = await createCustom({ ...values, image });
            if (response.success) {
              Modal.success({
                content: `Create Custom successfully !`
              });
              setReset(new Date());
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
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input the name !',
          },
          {
            min: 8,
            message: 'Please input name >= 8 characters !',
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Adress"
        rules={[
          {
            required: true,
            message: 'Please input address !',
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image"
        getValueFromEvent={normFile}
      >
        <Upload
          name="logo"
          listType="picture"
          maxCount={1}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  </Modal >
}