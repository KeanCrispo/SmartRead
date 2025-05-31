import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
      <BookOpen size={24} />
    </div>
  );
};

export default Logo;