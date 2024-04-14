import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Toaster } from '../components/ui/sonner';

export const PlainLayout = () => {
  const { isConnected } = useAccount();

  if (isConnected) {
    // Redirect user if they are not connected
    return <Navigate to="/exchange" />;
  }


  return (
    <div className="tracking-widest h-screen flex flex-col bg-[url('/background.png')] bg-center bg-cover overflow-hidden">
      <div className="flex-auto overflow-auto w-full">
        <Outlet />
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default PlainLayout;
