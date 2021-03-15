import AdminLayout from '../components/admin/Layout'
import CrimeList from '../components/LogList'

export default function App() {
  return (
    <>
      <AdminLayout keySelected="log" children={<CrimeList />} />
    </>
  );
}