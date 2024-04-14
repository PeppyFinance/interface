import { Toaster } from '../components/ui/sonner';
import { Topbar } from "../components/Navbar/topbar";
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/footer';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';

export const Layout = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    // Redirect user if they are not connected
    return <Navigate to="/" />;
  }

  return (
    <div className="tracking-widest h-screen flex flex-col bg-[url('/background.png')] bg-center bg-cover overflow-hidden">
      <Topbar />
      <div className="flex-auto overflow-auto w-full mt-70" id="content">
        <Outlet />
      </div>
      <footer>
        <Footer/>
      </footer>
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;