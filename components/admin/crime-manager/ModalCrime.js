import { Form, Modal, Input, Upload, Button, Switch, Select } from 'antd';
import React, { useState, useRef } from "react";
import { createCrime } from '../../../utils/api-services/crime-service'
import { toBase64 } from '../../../utils/helper';
import { UploadOutlined } from '@ant-design/icons';
import Webcam from "react-webcam";

const { Option } = Select

export default function ModalUser({ visible, setVisible, setReset }) {
  const [form] = Form.useForm();
  const [useWebcam, setUseWebcam] = useState(false)
  const [image, setImage] = useState(null)
  const webcamRef = useRef(null);

  return <Modal title={"Add new Crime"}
    visible={visible}
    style={{ top: 20 }}
    width={640}
    onCancel={() => {
      setVisible(false); setUseWebcam(false); setImage(false);
    }}
    onOk={() => {
      form
        .validateFields()
        .then(async (values) => {
          try {
            let _image = image ? await toBase64(image) : undefined;
            if (useWebcam) {
              _image = webcamRef.current.getScreenshot()
            }
            const response = await createCrime({ ...values, image: _image });
            if (response.success) {
              Modal.success({
                content: `Add Crime successfully !`
              });
              setReset(new Date());
              setVisible(false);
              setUseWebcam(false);
              setImage(false);
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
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="id_number"
        label="ID Number"
        rules={[
          {
            required: true,
            message: 'Please input the id number !',
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="permanent_residence"
        label="Permanent Residence"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="day_of_birth"
        label="Day of Birthh"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
      >
        <Select placeholder="Please select gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="image"
        label="* Image"
      >
        <Switch
          style={{ display: "block", marginBottom: 12 }}
          checkedChildren="Upload"
          unCheckedChildren="Use Webcam"
          onChange={(e) => setUseWebcam(e)}
        />
        {
          useWebcam ? <div style={{ textAlign: "center" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              width={250}
            />
          </div> : <Upload
            name="logo"
            listType="picture"
            maxCount={1}
            beforeUpload={(e) => { setImage(e); return true; }}
          >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
        }
      </Form.Item>
      <Form.Item
        name="other_infor"
        label="Other Infor"
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  </Modal >
}