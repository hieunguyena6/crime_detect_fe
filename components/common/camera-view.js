import { useRef, useState } from 'react'
import styles from '../../styles/Home.module.css'
import { Button, message, Modal, Image } from 'antd';
import Webcam from "react-webcam";
import { checkCrime } from '../../utils/api-services/crime-service'

export default function Home() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const capturePicture = async () => {
    try {
      setLoading(true)
      const response = await checkCrime({ real_image: webcamRef.current.getScreenshot() })
      if (response.success) {
        if (response.data.length > 0) {
          const crime = response.data[0];
          Modal.warning({
            content: (
              <div>
                <p>Name: {crime.name}</p>
                <p>Percent: {crime.percent * 100}%</p>
                <p>Real face: <Image src={crime.real_face} width={200} height={200} style={{ margin: '12px 32px' }} /></p>
                <p>Crime Face: <Image src={crime.face_image} width={200} height={200} style={{ margin: '12px 32px' }} /></p>
              </div>
            ),
            onOk() { },
            width: 540,
            style: { top: 20 }
          });
        } else {
          message.success("Success")
        }
      } else {
        message.error(response.message)
      }
      setLoading(false)
    } catch (error) {
      throw error
    }

  }

  return (
    <div className={styles.container}>
      <Webcam
        audio={false}
        ref={webcamRef}
      />
      <Button
        type="primary"
        style={{ margin: 16 }}
        size="large"
        onClick={capturePicture}
        loading={loading}
      >Capture</Button>
    </div>
  )
}
