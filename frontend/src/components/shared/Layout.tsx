import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
