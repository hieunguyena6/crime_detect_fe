import AdminLayout from '../../components/admin/Layout'
import CustomList from '../../components/admin/custom-manager'

export default function App() {
  return (
    <>
      <AdminLayout keySelected="customs" children={<CustomList />} />
    </>
  );
}