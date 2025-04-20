import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled = false,
  loading = false,
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseClasses = 'relative py-3 px-6 font-medium rounded-md focus:outline-none transition-all duration-300 overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-neon-blue/80 text-white hover:bg-neon-blue shadow-glow-blue',
    secondary: 'bg-dark-gray text-ice-blue border border-ice-blue/40 hover:border-ice-blue',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
    </motion.button>
  );
};

export default Button;