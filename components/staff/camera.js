import { useRef, useEffect, useState } from 'react'
import { Button, Row, Col, Modal, Select, Image, Tabs, Table, message } from 'antd';
import Webcam from "react-webcam";
import { checkCrime } from '../../utils/api-services/crime-service'

const { Option } = Select
const { TabPane } = Tabs;
export default function CameraView({ startShift, setStartShift }) {
  const webcamRef = useRef(null);

  const [showModal, setShowModal] = useState(false)

  const confirmEnding = () => {
    Modal.confirm({
      title: "Confirm Ending Shift ",
      icon: null,
      content: "Are you sure to Ending Shift ?",
      onOk: () => { setStartShift(false) }
    })
  }

  const [loading, setLoading] = useState(false);

  const columns_result = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    },
    {
      title: 'Percent',
      dataIndex: 'percent',
      key: 'percent',
      width: '10%',
      render: (text) => {
        return `${text * 100}%`
      }
    },
    {
      title: 'Real Face',
      dataIndex: 'real_face',
      key: 'real_face',
      width: '35%',
      align: "center",
      render: (text) => {
        return <Image src={text} />
      }
    },
    {
      title: "Crime's face ",
      dataIndex: 'face_image',
      key: 'face_image',
      width: '35%',
      align: "center",
      render: (text) => {
        return <Image src={text} />
      }
    }
  ];

  const capturePicture = async () => {
    try {
      setLoading(true)
      const response = await checkCrime({ real_image: webcamRef.current.getScreenshot() })
      if (response.success) {
        const list_crime = response.data
        if (list_crime.length > 0) {
          const crime = list_crime[0]
          const [, ...other_crimes] = list_crime
          Modal.warning({
            content: (
              <Tabs defaultActiveKey="best_result" >
                <TabPane tab="Most similarity" key="best_result">
                  <div>
                    <p>Name: {crime.name}</p>
                    <p>Percent: {crime.percent * 100}%</p>
                    <p>Real face: <Image src={crime.real_face} width={200} height={200} style={{ margin: '12px 32px' }} /></p>
                    <p>Crime Face: <Image src={crime.face_image} width={200} height={200} style={{ margin: '12px 32px' }} /></p>
                  </div>
                </TabPane>
                <TabPane tab="Other result">
                  <Table dataSource={other_crimes} columns={columns_result} pagination={false} />
                </TabPane>
              </Tabs>
            ),
            onOk() { },
            width: 640,
            style: { top: 20 },
          });
        } else {
          message.success("Success !!")
        }
      } else {
        message.error(response.message)
      }
      setLoading(false)
    } catch (error) {
      throw error
    }
  }

  return <Row style={{ height: "100%" }}>
    <Col
      className="site-layout-content" span={18}
      style={{ display: "flex", height: "100%" }}
    >
      {
        startShift ? <Webcam
          audio={false}
          ref={webcamRef}
          width="100%"
          height="100%"
          style={{ objectFit: "fill" }}
        /> :
          <Button
            size="large"
            type="primary"
            style={{ margin: "auto", padding: 24, height: "auto" }}
            onClick={() => setShowModal(true)}
          >Start Shift
          </Button>
      }
    </Col>
    {
      startShift && <Col span={6}
        style={{ justifyContent: "center", alignContent: "center", display: "flex", flexDirection: "column", padding: 32 }}
      >
        <Button
          style={{ minWidth: 120, marginBottom: 180, padding: 18, height: "auto", margin: "auto" }}
          size="large"
          type="primary"
          loading={loading}
          onClick={capturePicture}
        >
          Capture
        </Button>
        <Button
          style={{ maxWidth: 180, padding: 18, height: "auto", margin: "auto" }}
          size="large"
          type="danger"
          onClick={confirmEnding}
        >Ending shift
        </Button>
      </Col>
    }
    <Modal title="Select Camera"
      visible={showModal}
      onOk={() => { setShowModal(false); setStartShift(true) }}
      onCancel={() => setShowModal(false)}
    >
      <label>Camera</label>
      <Select
        showSearch
        style={{ width: 320, marginLeft: 64 }}
        placeholder="Available Camera"
      >
        <Option value="1">Camera 1</Option>
        <Option value="2">Camera 2</Option>
        <Option value="3">Camera 3</Option>
      </Select>
    </Modal>
  </Row>
}