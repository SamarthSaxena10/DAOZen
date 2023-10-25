import React, { useState } from 'react';

const NavbarComponent = ({ refs }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Select Item");

    const scrollToComponent = (ref) => {
        console.log('Attempting to scroll to:', ref);
        ref?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDropdownSelection = (item) => {
        setSelectedItem(item);
        setIsDropdownOpen(false);
    };

    return (
        <div className="bg-gray-100 p-4 z-20 mt-16">
            <nav className="flex justify-between items-center">
                <div className="flex items-center">
                    <a href="#" className="text-xl font-bold mx-6">BOSS NFT </a>
                    <div className="relative group">
                        
                       
                    </div>
                </div>
                <div>
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden px-3 py-1">
                        <span className="block h-1 w-5 bg-black mb-1"></span>
                        <span className="block h-1 w-5 bg-black mb-1"></span>
                        <span className="block h-1 w-5 bg-black"></span>
                    </button>
                </div>
                <div className={`lg:flex ${isOpen ? '' : 'hidden'}`}>
                    <a onClick={() => scrollToComponent(refs.tokenMetadata)} className="block lg:inline-block px-4 py-2">Token Metadata</a>
                    <a onClick={() => scrollToComponent(refs.tokenTransfers)} className="block lg:inline-block px-4 py-2">Token Transfers</a>
                    <a onClick={() => scrollToComponent(refs.tokenHolders)} className="block lg:inline-block px-4 py-2">Token Holders</a>

                   
                </div>
            </nav>
        </div>
    );
}

export default NavbarComponent;
