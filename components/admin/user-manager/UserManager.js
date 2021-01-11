import { Button, message, Table, Popover, Divider, Input, Space } from 'antd';
import React, { useEffect, useState } from "react";
import { editUser, getAllUsers } from '../../../utils/api-services/user-services'
import {
  EllipsisOutlined
} from '@ant-design/icons';
import ModalUser from './ModalUser'
import Head from 'next/head'
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { getUserSession } from '../../../utils/user-func';

export default function UserTable() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0)
  const [users, setUsers] = useState([])
  const [createUserVisible, setCreateUserVisible] = useState(false)
  const [popoverVisible, setPopoverVisible] = useState(-1)
  const [resetTable, setResetTable] = useState(new Date())
  const [userSelect, setUserSelect] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  useEffect(async () => {
    try {
      const data = await getAllUsers({ page, size, searchValue });
      if (data.success) {
        setUsers(data.data)
        setTotal(data.total)
      }
    } catch (error) {
      message.error("Fetch Data user error " + error.toString());
    }
  }, [page, size, resetTable, searchValue])

  const changeInfor = (user) => {
    setUserSelect(user)
    setCreateUserVisible(true)
    setPopoverVisible(-1)
  }

  const changeVisibleModal = (visible) => {
    setCreateUserVisible(visible)
    if (!visible) setUserSelect(null)
  }

  const disableAccount = async (user) => {
    await editUser(user.id, {
      is_disable: !user.is_disable
    })
    message.success("Successfully !")
    setResetTable(new Date())
  }

  const onSearch = e => setSearchValue(e.target.value)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: "center",
      key: "name"
    },
    {
      title: 'User name',
      dataIndex: 'user_name',
      align: "center",
      key: "user_name",
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: "center",
      key: "email"
    },
    {
      title: 'Organize',
      dataIndex: 'organize',
      align: "center",
      key: "organize"
    },
    {
      title: 'Role',
      dataIndex: 'role',
      align: "center",
      key: "role"
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      align: "center",
      key: "c_a"
    },
    {
      title: 'Enable',
      align: "center",
      key: "disable",
      filters: [
        {
          text: 'Disable',
          value: true,
        },
        {
          text: 'Enable',
          value: false,
        },
      ],
      render: (record) => <>
        <Checkbox
          checked={record.is_disable ? false : true}
          disabled={getUserSession().id == record.id}
          onChange={() => disableAccount(record)}
        />
      </>
    },
    {
      title: '',
      dataIndex: '',
      align: "center",
      key: "action",
      render: (record) => <Popover
        content={
          <>
            <a
              style={{ display: "block" }}
              onClick={() => changeInfor(record)}
            >
              Change information
        </a>
            <Divider style={{ margin: '4px 0px' }} />
            <a
              style={{ color: record.is_disable ? "green" : "red", display: "block", marginBottom: 8 }}
              onClick={() => disableAccount(record)}
            >
              {record.is_disable ? "Enable Account" : "Disable account"}
            </a>
          </>
        }
        title={<div style={{ textAlign: "center" }}>Action</div>}
        trigger="click"
        placement="bottom"
        visible={popoverVisible == record.id}
        onVisibleChange={() => setPopoverVisible(record.id == popoverVisible ? -1 : record.id)}
      >
        <EllipsisOutlined style={{ color: "#1890ff", fontSize: 24 }} />
      </Popover>
    },
  ];
  return <div>
    <Head>
      <title>User Manager</title>
    </Head>
    <h2 style={{ width: "100%", textAlign: "center" }}>User Manager</h2>
    <Input.Search
      placeholder="Search email, user name, full name"
      allowClear
      onChange={onSearch}
      style={{ width: '100%', margin: '12px 0px' }}
      size="large"
      value={searchValue}
    />
    <div style={{ width: "100%", textAlign: "right", marginBottom: 16 }}>
      <Button
        type="primary"
        size="large"
        onClick={() => setCreateUserVisible(!createUserVisible)}
        style={{ borderRadius: "16px" }}
      >Create User</Button>
    </div>
    <Table
      columns={columns}
      dataSource={users}
      pagination={{
        current: page,
        pageSize: size,
        total: total,
        showSizeChanger: true
      }}
      onChange={(paginate) => {
        setPage(paginate.current)
        setSize(paginate.pageSize)
      }}
    />
    <ModalUser visible={createUserVisible}
      user={userSelect}
      setVisible={changeVisibleModal}
      setResetTable={setResetTable}
    />
  </div>
}