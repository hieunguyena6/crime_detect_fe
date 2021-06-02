import '../styles/globals.css';
import '../styles/style.css';
import 'antd/dist/antd.css';
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }) {
  return <><Loading /><Component {...pageProps} /></>
}

export default MyApp
