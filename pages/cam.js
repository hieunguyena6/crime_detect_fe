import AdminLayout from '../components/admin/Layout'
import CameraView from '../components/common/camera-view'

export default function App() {
  return (
    <>
      <AdminLayout keySelected="cameras" children={<CameraView />} />
    </>
  );
}