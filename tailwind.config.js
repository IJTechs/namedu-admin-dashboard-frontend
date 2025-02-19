/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    screens: {
      xxs: '360px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xxs: '0.55rem',
          xs: '0.75rem',
          sm: '1rem',
          md: '1.25rem',
          lg: '1.5rem',
          xl: '4rem',
          '2xl': '7rem',
          '3xl': '16rem',
          '4xl': '32rem',
        },
      },
      borderWidth: {
        0.5: '0.5px',
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
      },

      boxShadow: {
        'card-shadow': '0px 1px 5px 1px rgba(0, 0, 0, 0.02)',
      },

      fontSize: {
        'fluid-h1': 'clamp(2.5rem, 5vw, 3.9rem)',
        'fluid-h2': 'clamp(2rem, 3.5vw, 3rem)',
        'fluid-h3': 'clamp(1.75rem, 3vw, 2.5rem)',
        'fluid-h4': 'clamp(1.5rem, 2.5vw, 2rem)',
        'fluid-h5': 'clamp(1.25rem, 2vw, 1.5rem)',
        'fluid-p': 'clamp(1rem, 2vw, 1.25rem)',
        'fluid-sm': 'clamp(0.9rem, 1.5vw, 1.1rem)',
      },

      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },

      textColor: {
        'secondary-soft': 'rgba(255, 255, 255, 0.06)',
        'secondary-bold': 'rgba(255, 255, 255, 0.141)',
        'secondary-strong': 'rgba(255, 255, 255, 0.16)',
        'secondary-deep': 'rgba(255, 255, 255, 0.329)',
      },

      colors: {
        // Custom colors
        'rgba-white-10': 'rgba(255, 255, 255, 0.10)',
        'rgba-white-20': 'rgba(255, 255, 255, 0.20)',

        'primary-background': 'var(--color-primary-background)',
        'primary-accent': 'var( --color-primary)',
        'primary-heading': 'var(--color-primary-heading)',
        'primary-text': 'var(--color-primary-text)',
        'text-black': 'var(--color-text-black)',
        'text-grey': 'var(--color-text-grey)',
        'text-secondary': 'var(--color-text-secondary)',
        'cards-white': 'var(--color-cards-white)',
        'cards-lavender-blue': 'var(--color-cards-lavender-blue)',
        'cards-footer': 'var(--color-cards-footer)',
        'primary-button': 'var(--color-primary-button)',
        'secondary-button': 'var(--color-secondary-button)',
        'secondary-background': 'var(--color-secondary-background)',
        'secondary-heading': 'var(--color-secondary-heading)',
        green: 'var(--color-green)',
        red: 'var(--color-red)',

        // Shadcn colors

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
