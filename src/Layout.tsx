import { useMemo } from 'react';
import './App.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="flex justify-between px-3 py-2">
      <div>
        <h1 className="font-medium">{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="space-x-2">
        <Link className="font-thin underline" to="/exchange">
          Trade
        </Link>
        <Link className="font-thin underline" to="/positions">
          Positions
        </Link>
        <Link className="font-thin underline" to="/closed-positions">
          Closed
        </Link>
        <Link className="font-thin underline" to="/pool">
          Pool
        </Link>
      </div>
    </div>
  );
};

export const Layout = () => {
  const location = useLocation();
  const [title, subtitle] = useMemo(() => {
    switch (location.pathname) {
      case '/exchange':
        return ['Trading', 'Buy Position'];
      case '/positions':
        return ['Positions', ''];
      case '/closed-positions':
        return ['Closed Positions', ''];
      case '/pool':
        return ['Liquidity Pool', 'Stats'];
      default:
        return ['', ''];
    }
  }, [location]);

  return (
    <div className="tracking-widest h-full bg-[url('/background.png')] bg-center bg-cover">
      <Header title={title} subtitle={subtitle} />
      <Outlet />
    </div>
  );
};
