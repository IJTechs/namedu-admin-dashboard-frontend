import { cn } from '@/utils/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'text-neutral-50 bg-primary-button',
        destructive:
          'bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
        outline: 'border border-neutral-200 ',
        secondary: 'text-neutral-900',
        ghost: ' p-0 m-0 h-fit ',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
        icon: 'p-0 m-0 h-fit w-fit text-[#5791FF]',
      },
      size: {
        default: 'h-9 px-4 py-2 sm:h-10 sm:px-5 lg:h-12 lg:px-6',
        sm: 'h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 lg:h-10 lg:px-5',
        lg: 'h-10 rounded-md px-8 text-lg sm:h-12 sm:px-10 lg:h-14 lg:px-12',
        icon: 'h-fit w-fit p-0 m-0 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const ActivityIndicator = () => (
  <RotatingLines
    strokeColor="white"
    strokeWidth="5"
    animationDuration="0.75"
    width="26"
    ariaLabel="rotating-lines-loading"
  />
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  activeScale?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText = '',
      activeScale = 0.95,
      ...props
    },
    ref
  ) => {
    const [pressed, setPressed] = React.useState(false);
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          className,
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
        )}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        style={{
          transform: pressed ? `scale(${activeScale})` : 'scale(1)',
          transition: 'transform 0.2s ease-in-out',
        }}
        disabled={loading || props.disabled}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <ActivityIndicator />
            {loadingText}
          </>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
