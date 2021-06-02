import { Table, message, Image, Input } from 'antd';
import { useEffect, useState } from "react";
import { getLog } from '../utils/api-services/log-services'
import dayjs from 'dayjs'

export default function LogList() {
  const [searchValue, setSearchValue] = useState('');
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    try {
      const data = await getLog({ page, size, search: searchValue });
      if (data.success) {
        setLogs(data.data)
        setTotal(data.total)
      }
    } catch (error) {
      message.error("Fetch Log error " + error.toString());
    }
  }, [page, size, searchValue]
  )

  const columns = [
    {
      title: "Crime's information",
      key: "crime",
      children: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        render: (text, record) => <a href="#">{record.crime.name}</a>
      },
      {
        title: 'ID Number',
        dataIndex: 'id_number',
        key: 'id_number',
        // width: '10%',
        width: 120,
        render: (text, record) => record.crime.id_number
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        width: 200,
        render: (text, record) => <Image width={150} height={100} src={record.crime.image}></Image>
      },
      {
        title: 'Face Image',
        dataIndex: 'face_image',
        key: 'face_image',
        width: 100,
        render: (text, record) => <Image width={80} height={80} src={record.crime.face_image}></Image>
      }
      ]
    },
    {
      title: 'Image In Custom',
      key: 'image_custom',
      width: 200,
      render: (text, record) => <Image width={150} height={100} src={record.image}></Image>
    },
    {
      title: 'Face In Custom',
      key: 'face_image_custom',
      width: 100,
      render: (text, record) => <Image width={80} height={80} src={record.face_image}></Image>
    },
    {
      title: "Custom",
      children: [{
        title: "Custom Name",
        key: 'Custom_Name',
        width: 100,
        render: (text, record) => record.custom.name
      },
      {
        title: "Custom Address",
        key: 'Custom_address',
        width: 100,
        render: (text, record) => record.custom.address
      }],
      key: "custom"
    },
    {
      title: 'Percent',
      dataIndex: 'percent',
      key: 'percent',
      fixed: 'right',
      width: 85,
      render: (text) => `${(text * 100).toFixed(2)}%`
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      fixed: 'right',
      width: 100,
      render: (text) => dayjs(text).format("DD/MM/YY HH:mm:ss")
    }
  ];

  const onSearch = e => setSearchValue(e.target.value)

  return <>
    {/* <Input.Search
      placeholder="Search email, user name, full name"
      allowClear
      onChange={onSearch}
      style={{ width: '100%', margin: '12px 0px' }}
      size="large"
      value={searchValue}
    /> */}
    <Table
      dataSource={logs}
      columns={columns}
      scroll={{ x: 550 }}
      pagination={{
        current: page,
        pageSize: size,
        onChange: (page, size) => {
          setPage(page)
          setSize(size)
        },
        pageSizeOptions: [5, 10, 20, 50, 100],
        showSizeChanger: true,
        total: total,
      }}
    />
  </>
}
