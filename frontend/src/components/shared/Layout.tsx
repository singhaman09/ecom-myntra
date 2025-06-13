import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';

const Layout = () => (
  <>
    <Header />
   <Outlet/>
    <Footer />
  </>
);

export default Layout;
