import AdminLayout from '../../components/admin/Layout'
import CameraList from '../../components/admin/camera-manager'

export default function App() {
  return (
    <>
      <AdminLayout keySelected="cameras" children={<CameraList />} />
    </>
  );
}