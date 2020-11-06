import { Form, Input, Button, Checkbox, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons'
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import Head from 'next/head'

export default function RegisterForm() {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form
        name="normal_login"
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Register</Typography.Title>
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
        <Form.Item
          name="re-password"
          rules={[{ required: true, message: 'Please re-input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password again"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            Sign up
        </Button>
        Or <Link href="/login"><a style={{color: '#1890ff'}}>login now!</a></Link>
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
