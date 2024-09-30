import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
