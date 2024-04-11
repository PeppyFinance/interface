import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        constructive: {
          DEFAULT: 'hsl(var(--constructive))',
          foreground: 'hsl(var(--constructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        glass: {
          DEFAULT: 'hsla(var(--glass))',
        },
        darkGlass: {
          DEFAULT: 'hsla(var(--dark-glass))',
        },
      },
      boxShadow: {
        default:
          '0px 0px 3px 0px rgba(254, 251, 224, 0.20) inset, 0px 4px 4px 0px rgba(255, 255, 255, 0.5)',
        'md': '0 4px 14px 0 rgba(255, 255, 255, 0.39)',
      },
      textShadow: {
        DEFAULT: '0px 0px 4px #FFF, 0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {
        '3xl': '0px 4px 34px rgba(0, 0, 0, 0.65)',
      },
      fontSize: {
        xxs: '0.6rem',
      },
      borderRadius: {
        md: 'calc(var(--radius))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    animatePlugin,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
} satisfies Config;
