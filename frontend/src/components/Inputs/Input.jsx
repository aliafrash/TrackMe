import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '../Icons';

const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[13px] font-medium text-slate-800">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={inputType}
          placeholder={placeholder}
          className={`w-full text-sm text-slate-900 bg-slate-50 border ${
            error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
          } rounded-xl px-4 py-3 outline-none transition duration-200 focus:bg-white focus:ring-2 ${
            error ? 'focus:ring-red-100' : 'focus:ring-purple-100'
          } ${isPassword ? 'pr-11' : ''}`}
          value={value}
          onChange={(e) => onChange(e)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3.5 text-slate-400 hover:text-primary transition cursor-pointer p-1"
          >
            {showPassword ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeSlashIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-normal mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default Input;
