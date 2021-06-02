import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUserSession } from "../utils/user-func"
import { Layout } from 'antd';
import CameraView from '../components/staff/camera'
import HeaderStaff from '../components/staff/Header'
const { Content } = Layout;

export default function Home() {
  const router = useRouter()
  const [startShift, setStartShift] = useState(false)

  useEffect(() => {
    const user_data = getUserSession();
    if (!user_data) {
      router.push("/login")
    } else {
      if (user_data.role == "admin") {
        // router.push("/admin")
        window.location.href = "/admin"
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={"layout"}>
        {!startShift && <HeaderStaff selectedKey="shift" />}
        <Content
          style={{
            padding: '0 50px', marginTop: 12, marginBottom: 12,
            height: startShift ? "calc(100vh - 24px)" : "calc(100vh - 64px - 24px)"
          }}
        >
          <CameraView startShift={startShift} setStartShift={setStartShift} />
        </Content>
      </Layout>
    </>
  )
}