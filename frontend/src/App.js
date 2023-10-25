import logo from './logo.svg';
import './App.css';
import TokenMetadataChart from './components/TokenMetadataChart';
import TokenMetadataTable from './components/TokenMetadataTable';
import BasicTable from './components/BasicTable';
import NavbarComponent from './components/Navbar';
import React , {useRef} from 'react'

function App() {
  const tokenMetadata = useRef(null);
  const tokenTransfer = useRef(null);
  const tokenHolders = useRef(null);

  return (
    <div className="bg-blue-100 min-h-screen m-0 p-0"> {/* Ensure no padding at the top */}
     <NavbarComponent refs={{ tokenMetadata }} />
    <div className="mt-5 p-0"> {/* Ensure no margin at the top */}
     
      <div ref = {tokenMetadata}> <TokenMetadataChart/> </div>
    </div>
    <div className="flex justify-center items-center py-6 mx-auto w-4/5">
        <BasicTable />
    </div>
  </div>

  );
}

export default App;
