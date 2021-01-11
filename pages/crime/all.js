import AdminLayout from '../../components/admin/Layout'
import CrimeList from '../../components/admin/crime-manager'

export default function App() {
  return (
    <>
      <AdminLayout keySelected="all_crime" children={<CrimeList type="all" />} />
    </>
  );
}