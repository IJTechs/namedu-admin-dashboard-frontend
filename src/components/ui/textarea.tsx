import * as React from 'react';

import { cn } from '@utils/utils.ts';

type TextareaProps = React.ComponentProps<'textarea'> & {
  label?: string;
  hasError?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps & React.ComponentProps<'textarea'>>(
  ({ hasError, style, label, className, placeholder, onChange, value, required, ...props }, ref) => {
    return (
      <div className="h-full flex flex-col">
        {label && (
          <label htmlFor={label} className="text-sm font-extralight font-montserrat">
            {label}
            {required && <span className="text-red text-md ">*</span>}
          </label>
        )}

        <textarea
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          style={style}
          className={cn(
            ` font-light   p-4  w-full rounded-12 bg-transparent       border1 resize-none   ${
              hasError ? 'focus:border-rose-500' : 'focus:border-sky-600'
            }  focus:outline-none placeholder:text-gray placeholder:text-[12px] placeholder:font-extralight `,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
