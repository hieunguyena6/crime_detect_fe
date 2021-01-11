import AdminLayout from '../../components/admin/Layout'
import UserTable from '../../components/admin/user-manager/UserManager'

export default function App() {
  return (
    <>
      <AdminLayout keySelected="user" children={<UserTable />} />
    </>
  );
}