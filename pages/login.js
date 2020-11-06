import { Form, Input, Button, Checkbox, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons'
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import Head from 'next/head'

export default function LoginForm() {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form
        name="normal_login"
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Login</Typography.Title>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={styles.login_form_forgot} href="">
            Forgot password
        </a>
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            Log in
        </Button>
        Or <Link href="/register" ><a>register now!</a></Link>
        </Form.Item>
        <Divider plain>OR</Divider>
        <div>
          <Button
            type="primary"
            className={styles.button_fb}
            icon={<FacebookFilled />}
          >
            Log in with Facebook
          </Button>
          <Button
            type="danger" style={{ width: '100%', height: 40 }}
            icon={<GoogleCircleFilled />}
          >
            Log in with Google
            </Button>
        </div>
      </Form>
    </div>
  );
};
