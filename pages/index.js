import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUserSession } from "../utils/user-func"

export default function Home() {
  const router = useRouter()
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
    </>
  )
}