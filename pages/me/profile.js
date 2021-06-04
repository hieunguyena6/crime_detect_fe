import { Tabs, Layout, Form, Input, Col, Row, Button, message } from 'antd';
import HeaderStaff from '../../components/staff/Header'
import { getUserSession } from "../../utils/user-func"
import { getUser, editUser } from "../../utils/api-services/user-services"
import { useEffect, useState } from 'react';

const { TabPane } = Tabs;
const { Content } = Layout;

export default function Profile() {
  const [form] = Form.useForm();
  const [user, setUser] = useState(getUserSession())

  const saveInfor = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const response = await editUser(user.id, values);
          if (response.success) {
            Modal.success({
              content: `Successfully edit user ${values.user_name}`
            });
          } else {
            Modal.error({
              content: `${response.message}`
            });
          }
        } catch (error) {
          throw error;
        }
      })
  }

  return <Layout className={"layout"}>
    <HeaderStaff selectedKey="profile" />
    <Content
      style={{
        padding: '0 64px', marginTop: 12, marginBottom: 12,
        height: "calc(100vh - 64px - 24px)"
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Change Profile" key="1">
          <Row style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
            <Col span={12}>
              <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
              // layout="inline"
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
                  <Input disabled defaultValue={user?.user_name} />
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
                  <Input defaultValue={user?.name} />
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
                  <Input disabled defaultValue={user?.organize} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the Email !',
                    },
                  ]}
                >
                  <Input defaultValue={user?.email} />
                </Form.Item>
                <Form.Item
                  name="phone_number"
                  label="Phone Number"
                  style={{ marginBottom: 12 }}
                >
                  <Input defaultValue={user?.phone} />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={saveInfor}
                >Save</Button>
              </Form>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Change Password" key="2">
          <Row style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
            <Col span={12}>
              <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
              // layout="inline"
              >
                <Form.Item
                  name="old_password"
                  label="Old password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the Old password !',
                    },
                    {
                      min: 6,
                      message: 'Please input the Old password >= 6 characters !',
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="new_password"
                  label="Neew password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the new password !',
                    },
                    {
                      min: 6,
                      message: 'Please input the new password >= 6 characters !',
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="re_password"
                  label="Re new password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the Re new password !',
                    },
                    {
                      min: 6,
                      message: 'Please input the Re new password >= 6 characters !',
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={saveInfor}
                >Save</Button>
              </Form>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Content>
  </Layout>
}