import { Layout, Menu } from 'antd';
import {
  BankOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useState } from 'react'
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import Link from 'next/link'
import { removeUserSessionWhenExpired, getUserSession } from '../../utils/user-func';

export default function AdminLayout({ keySelected, children }) {
  const [collapsed, setCollapsed] = useState(false)

  const logout = () => {
    removeUserSessionWhenExpired()
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(e) => {
          setCollapsed(e)
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        width={240}
      >
        <div className="logo" >
          {!collapsed && <> Hello, {getUserSession()?.user_name} </>}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[keySelected]} defaultOpenKeys={['sub1']}>
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            <Link href="/admin">
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined />}>
            <Link href="/admin/user">
              Users
            </Link>
          </Menu.Item>
          <Menu.Item key="notification" icon={<SoundOutlined />}>
            Notification
          </Menu.Item>
          <Menu.Item key="customs" icon={<BankOutlined />}>
            <Link href="/admin/custom">
              Customs
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="police" icon={<SafetyCertificateOutlined />}>
            Polices
            </Menu.Item> */}
          <Menu.Item key="cameras" icon={<VideoCameraOutlined />} >
            <Link href="/admin/camera">
              Cameras
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Crimes">
            <Menu.Item key="all_crime">
              <Link href="/crime/all">
                All Crimes
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="log" icon={<FileOutlined />}>
            <Link href="/log">
              Log
              </Link>
          </Menu.Item>

          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link href="/admin/setting">
              Setting
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 240 }}>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Hiếu Nguyễn - UET - 17020744</Footer>
      </Layout>
      <style jsx>
        {
          `.logo {
          height: 32px;
          margin: 16px;
          padding: 4px;
          color: #fff;
          text-align: center;
          background: rgba(255, 255, 255, 0.3);
          }
        `
        }

      </style>
    </Layout>
  );
}