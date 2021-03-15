import AdminLayout from '../../components/admin/Layout'
import SettingPage from '../../components/admin/setting'

export default function App() {
  return (
    <>
      <AdminLayout keySelected="settings" children={<SettingPage />} />
    </>
  );
}