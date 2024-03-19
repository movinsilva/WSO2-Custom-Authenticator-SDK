import Footer from "./footer";
import Navbar from "./navbar";

const Layout: React.FC = ({ children }, isFooter = false) => {
  return (
    <div>
      <Navbar />
      {children}
      {isFooter && <Footer />}
    </div>
  );
};

export default Layout;
