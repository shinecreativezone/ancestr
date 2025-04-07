
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export function Logo({ size = 'md', variant = 'dark' }: LogoProps) {
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
        <div className="flex items-center justify-center bg-[#1F4959] text-white rounded-lg p-1 mr-2">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={sizeClasses[size]}
          >
            <path 
              d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="#5C7C89"
            />
            <path 
              d="M9 10L11.5 12.5L15 9" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl md:text-2xl">ancestr</span>
      </div>
    </Link>
  );
}
