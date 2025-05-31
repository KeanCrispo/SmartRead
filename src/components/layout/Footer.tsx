import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold">SmartRead</div>
            <div className="text-sm mt-1">Learn and Play Anywhere!</div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-sm mb-2">
              Ajos Elementary School
            </div>
            <div className="text-xs">
              &copy; {currentYear} SmartRead Educational Platform
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;