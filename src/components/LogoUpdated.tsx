
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export function LogoUpdated({ size = 'md', variant = 'dark' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };
  
  const colorClasses = {
    dark: 'text-[#011425]',
    light: 'text-white'
  };
  
  return (
    <Link to="/" className="flex items-center">
      <div className={`${sizeClasses[size]} ${colorClasses[variant]} flex items-center font-bold`}>
        <div className="flex items-center justify-center bg-gradient-to-br from-[#5C7C89] to-[#1F4959] text-white rounded-lg p-1 mr-2">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={sizeClasses[size]}
          >
            <path 
              d="M12 2C7.58172 2 4 5.58172 4 10V14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14V10C20 5.58172 16.4183 2 12 2Z" 
              fill="#1F4959" 
              stroke="#5C7C89" 
              strokeWidth="1.5"
            />
            <path 
              d="M9 11C10.5 13 13.5 13 15 11" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <circle cx="8" cy="8" r="1.5" fill="white" />
            <circle cx="16" cy="8" r="1.5" fill="white" />
            <path 
              d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" 
              fill="#5C7C89" 
            />
          </svg>
        </div>
        <span className="text-xl md:text-2xl font-serif">Ancestr</span>
        <span className="text-xs ml-1 text-[#5C7C89] font-semibold mt-1">CONNECT</span>
      </div>
    </Link>
  );
}
