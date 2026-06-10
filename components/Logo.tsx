import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 180, height = 48 }) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.svg"
        alt="ManaTech"
        width={width}
        height={height}
        priority
        className="w-auto h-auto"
      />
    </div>
  );
};

export default Logo;
