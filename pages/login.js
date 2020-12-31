import { useEffect } from 'react'
import { Form, Input, Button, Checkbox, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from '../styles/Login.module.css'
import { login } from '../utils/api-services/user-services'
import Head from 'next/head'
import { saveUserSession, getUserSession } from "../utils/user-func"
import { useRouter } from 'next/router'

export default function LoginForm() {
  const router = useRouter()

  useEffect(() => {
    const user_data = getUserSession();
    if (user_data) {
      router.push('/')
    }
  }, [])

  const onFinish = async values => {
    try {
      const response = await login({
        user_name: values.username,
        password: values.password
      })
      if (!response.success) {
        message.error(response.message)
      } else {
        message.success("Login successfully")
        saveUserSession(
          {
            token: response.jwt_token,
            ...response.user
          }
        )
        router.push("/")
      }
    } catch (error) {
      message.error(error.toString())
    }
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
          name="username"
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
        </Form.Item>
        {/* Or <Link href="/register">register now!</Link> */}
      </Form>
    </div>
  );
};
