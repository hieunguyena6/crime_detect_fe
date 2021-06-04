import { VideoCameraOutlined, LogoutOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router'
const { Header } = Layout;
import { getUserSession, removeUserSessionWhenExpired } from "../../utils/user-func"

export default function HeaderStaff({ selectedKey }) {
  const router = useRouter()

  const logout = () => {
    removeUserSessionWhenExpired()
  }

  return <Header id="components-layout-demo-top">
    <div className="logo"></div>
    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
      <Menu.Item key="shift" onClick={() => { router.push("/") }}><VideoCameraOutlined />Shift</Menu.Item>
      <Menu.Item key="3" onClick={() => { router.push("/staff/crimes") }} >
        <TeamOutlined />
            List Crime
            </Menu.Item>
      <Menu.Item key="profile" onClick={() => { router.push("/me/profile") }}>
        <UserOutlined />Profile Setting
              </Menu.Item>
      <Menu.Item key="4" onClick={logout}><LogoutOutlined />Logout</Menu.Item>
      <Menu.Item key="5" style={{ float: "right" }} > Hello, {getUserSession()?.user_name} </Menu.Item>
    </Menu>
  </Header>
}