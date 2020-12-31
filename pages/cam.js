import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { Button, Spin, Modal } from 'antd';
import Webcam from "react-webcam";
import axios from 'axios';

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [img, setImg] = useState(null)
  const [name, setName] = useState("")
  const webcamRef = useRef(null);

  // useEffect(() => {
  //   let user = window.localStorage.user
  //   //console.log(user);
  //   if (!user) {
  //     router.push('/login')
  //   } else {
  //     setLoading(false)
  //   }
  // }, [])

  const capturePicture = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("passport_profile_image", webcamRef.current.getScreenshot());
    bodyFormData.append('real_image', webcamRef.current.getScreenshot());
    const response = await axios.post('http://0.0.0.0:5000/api/check',
      bodyFormData
    )
    Modal.info({
      content: (
        <div>
          <p>{response.data.crimes[0].name}</p>
          <p>{response.data.crimes[0].percent * 100}%</p>
        </div>
      ),
      onOk() { },
    });
  }

  const upload = async () => {
    var bodyFormData = new FormData();
    var name = prompt("Please enter your name", "");
    if (name) {
      bodyFormData.append("name", name);
      bodyFormData.append('image', webcamRef.current.getScreenshot());
      const response = await axios.post('http://0.0.0.0:5000/api/crimes',
        bodyFormData
      )
      Modal.info({
        content: (
          <div>
            OK
          </div>
        ),
        onOk() { },
      });
    }
  }

  return (
    <div className={styles.container}>
      <Webcam
        audio={false}
        ref={webcamRef}
      />
      {/* <Spin size="large" spinning={loading} /> */}
      <Button onClick={capturePicture}>Capture</Button>
      <Button onClick={upload}>Capture New Person</Button>
    </div>
  )
}
