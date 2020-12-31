import { Button, message, Table, Modal } from 'antd';
import React, { useEffect, useState } from "react";
import { getAllUsers } from '../../utils/api-services/user-services'

export default function UserTable() {

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0)
  const [users, setUsers] = useState([])
  const [createUserVisible, setCreateUserVisible] = useState(false)

  useEffect(async () => {
    try {
      const data = await getAllUsers({ page, size });
      if (data.success) {
        setUsers(data.data)
        setTotal(data.total)
      }
    } catch (error) {
      message.error("Fetch Data user error " + error.toString());
    }
  }, [page, size])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: "center"
    },
    {
      title: 'User name',
      dataIndex: 'user_name',
      align: "center"
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: "center"
    },
    {
      title: 'Organize',
      dataIndex: 'organize',
      align: "center"
    },
    {
      title: 'Role',
      dataIndex: 'role',
      align: "center"
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      align: "center"
    },
  ];
  return <div>
    <h2 style={{ width: "100%", textAlign: "center" }}>User Manager</h2>
    <div style={{ width: "100%", textAlign: "right", marginBottom: 16 }}>
      <Button type="primary" size="large" onClick={() => setCreateUserVisible(!createUserVisible)}>Create User</Button>
    </div>
    <Table
      columns={columns}
      dataSource={users}
      pagination={{
        current: page,
        pageSize: size,
        total: total
      }}
      onChange={(paginate) => {
        setPage(paginate.current)
        setSize(paginate.size)
      }}
    />
    <Modal title="Basic Modal" visible={createUserVisible} >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </div>
}