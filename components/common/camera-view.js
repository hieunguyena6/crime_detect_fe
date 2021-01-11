import { useRef } from 'react'
import styles from '../../styles/Home.module.css'
import { Button, Modal } from 'antd';
import Webcam from "react-webcam";
import axios from 'axios';

export default function Home() {
  const webcamRef = useRef(null);

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
      <Button type="primary" style={{ margin: 16 }} size="large" onClick={capturePicture}>Capture</Button>
      {/* <Button onClick={upload}>Capture New Person</Button> */}
    </div>
  )
}
