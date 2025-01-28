import * as React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PatternFormat } from 'react-number-format';
import { InputProps } from '@/utils/interfaces/input.interface';
import { cn } from '@/utils/utils';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      hasError,
      style,
      className,
      label,
      type = 'text',
      placeholder,
      onChange,
      value,
      pattern,
      labelClassname,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const togglePasswordVisibility = () =>
      setIsPasswordVisible(!isPasswordVisible);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const inputClassNames = cn(
      ' px-2 placeholder:text-gray focus:ring-0 border1 indent-1 focus:outline-none placeholder:text-[12px] placeholder:font-extralight flex font-light w-full h-[45px] lg:h-[50px] rounded-xl bg-transparent text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:gray disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#F1F1F1]/80',
      hasError
        ? 'focus:ring-0 focus:outline-none focus:border-red-500 '
        : 'focus:ring-0 focus:outline-none focus:border-sky-600 ',
      className
    );

    return (
      <div className="flex flex-col relative">
        {/* Label */}
        <label
          className={`${labelClassname} text-sm font-extralight font-montserrat`}
        >
          {label}
        </label>

        <div className="relative">
          {type === 'tel' ? (
            <PatternFormat
              format="+998 (##) ### ## ##"
              mask="_"
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              pattern={pattern}
              placeholder={placeholder || '+998 (__) ___ __ __'}
              className={inputClassNames}
              style={style}
              {...props}
            />
          ) : (
            <input
              autoComplete="off"
              type={
                type === 'password'
                  ? isPasswordVisible
                    ? 'text'
                    : 'password'
                  : type
              }
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              pattern={pattern}
              className={inputClassNames}
              style={style}
              {...props}
            />
          )}

          {type === 'password' && isFocused && (
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {isPasswordVisible ? (
                <FaEyeSlash className="w-5 h-5 text-slate-400" />
              ) : (
                <FaEye className="w-5 h-5 text-slate-400" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
