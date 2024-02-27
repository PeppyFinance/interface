import './App.css';
import { WalletButton } from './components/WalletButton';
import { BalanceDisplay } from './components/BalanceDisplay';
import { PositionList } from './components/PositionList';
import { OpenPositionForm } from './components/OpenPositionForm';

function App() {
  return (
    <div className="tracking-widest h-full bg-[url('/background.png')] bg-center bg-cover">
      <div className="px-3 py-2 h-full flex flex-col">
        <div className="flex justify-between">
          <WalletButton />
        </div>
        <div className="pt-2">
          <BalanceDisplay />
        </div>
        <div className="pt-2">
          <PositionList />
        </div>
        <div className="pt-2">
          <OpenPositionForm />
        </div>
        <div className="flex justify-between">
          <div className="space-x-2">
            <a href="#jo" className="font-thin underline">
              History
            </a>
            <a href="#jo" className="font-thin underline">
              Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

