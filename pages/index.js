import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUserSession } from "../utils/user-func"
import { default as AppAdmin } from '../components/admin/App'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState({})
  useEffect(() => {
    const user_data = getUserSession();
    setUser(user_data)
    if (!user_data) {
      router.push("/login")
    }
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        user && user.role === "admin" && <AppAdmin />
      }
    </>
  )
}