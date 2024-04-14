import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/footer';
import { Toaster } from '../components/ui/sonner';

export const PlainLayout = () => {
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
