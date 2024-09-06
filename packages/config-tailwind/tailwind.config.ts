import type { Config } from 'tailwindcss';
import * as tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */

const config: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xl: '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      screens: {
        xxs: '390px',
        xs: '420px'
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        primary: {
          DEFAULT: 'var(--primary)',
          active: 'var(--primary-active)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          darker: 'var(--primary-darker)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          active: 'var(--secondary-active)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
          darker: 'var(--secondary-darker)',
          foreground: 'var(--secondary-foreground)'
        },
        neutral: {
          DEFAULT: 'var(--neutral)',
          active: 'var(--neutral-active)',
          light: 'var(--neutral-light)',
          dark: 'var(--neutral-dark)',
          darker: 'var(--neutral-darker)',
          foreground: 'var(--neutral-foreground)'
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)'
        },

        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)'
        },

        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },

        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },

        card: {
          DEFAULT: 'var(--background)',
          foreground: 'var(--foreground)'
        }
      },
      boxShadow: {
        DEFAULT: '0px 4px 12px rgba(0, 0, 0, 0.08)'
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-sans)']
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [tailwindAnimate]
};

export default config;
