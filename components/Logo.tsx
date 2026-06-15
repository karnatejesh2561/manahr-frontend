import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  type?: string
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 180, height = 48, type = 'logo-black' }) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={type === 'logo-white' ? "/logo-white.svg" : "/logo.svg"}
        alt="ManaTech"
        width={width}
        height={height}
        priority
        className="h-[50px] object-cover"
      />
    </div>
  );
};

export default Logo;
