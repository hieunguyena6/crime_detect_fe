import { Layout, Menu } from 'antd';
import {
  BankOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import UserTable from './User'
import { useEffect, useState } from 'react'
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [key, setKey] = useState("dashboard")

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(e) => {
        setCollapsed(e)
      }}
        width={240}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={({ key }) => { setKey(key) }} selectedKeys={[key]}>
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            Dashboard
            </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="notification" icon={<SoundOutlined />}>
            Notification
          </Menu.Item>
          <Menu.Item key="customs" icon={<BankOutlined />}>
            Customs
            </Menu.Item>
          <Menu.Item key="police" icon={<SafetyCertificateOutlined />}>
            Polices
            </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Cameras
            </Menu.Item>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Crimes">
            <Menu.Item key="6">All Crimes</Menu.Item>
            <Menu.Item key="8">Wanted Crimes</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Log
            </Menu.Item>
          <Menu.Item key="setting" icon={<SettingOutlined />}>
            Setting
            </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {(() => {
              switch (key) {
                case "dashboard":
                  return <UserTable />
                case "user":
                  return <UserTable />
                default:
                  return <div />
              }
            })()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Hiếu Nguyễn - UET - 17020744</Footer>
      </Layout>
      <style jsx>
        {
          `.logo {
          height: 32px;
          margin: 16px;
          background: rgba(255, 255, 255, 0.3);
          }
        `
        }

      </style>
    </Layout>
  );
}