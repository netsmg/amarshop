/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {

        /* Text colors with subtle transparency */
    --text-50: hsla(340, 46%, 95%, 0.9);
    --text-100: hsla(342, 45%, 90%, 0.9);
    --text-200: hsla(342, 45%, 80%, 0.85);
    --text-300: hsla(341, 46%, 70%, 0.8);
    --text-400: hsla(341, 46%, 60%, 0.75);
    --text-500: hsla(341, 46%, 50%, 0.9);
    --text-600: hsla(341, 46%, 40%, 0.95);
    --text-700: hsla(341, 46%, 30%, 0.97);
    --text-800: hsla(342, 45%, 20%, 0.98);
    --text-900: hsla(342, 45%, 10%, 0.99);
    --text-950: hsla(340, 46%, 5%, 0.99);

    /* Background colors with glass effect */
    --background-50: hsla(340, 36%, 95%, 0.9);
    --background-100: hsla(341, 37%, 90%, 0.85);
    --background-200: hsla(339, 37%, 80%, 0.8);
    --background-300: hsla(340, 37%, 70%, 0.75);
    --background-400: hsla(340, 37%, 60%, 0.7);
    --background-500: hsla(340, 37%, 50%, 0.65);
    --background-600: hsla(340, 37%, 40%, 0.6);
    --background-700: hsla(340, 37%, 30%, 0.55);
    --background-800: hsla(339, 37%, 20%, 0.5);
    --background-900: hsla(341, 37%, 10%, 0.45);
    --background-950: hsla(340, 36%, 5%, 0.4);
        /* Primary colors with depth */
    --primary-50: hsla(79, 62%, 95%, 0.9);
    --primary-100: hsla(77, 61%, 90%, 0.85);
    --primary-200: hsla(78, 63%, 80%, 0.8);
    --primary-300: hsla(78, 62%, 70%, 0.75);
    --primary-400: hsla(78, 62%, 60%, 0.7);
    --primary-500: hsla(78, 62%, 50%, 0.9);
    --primary-600: hsla(78, 62%, 40%, 0.95);
    --primary-700: hsla(78, 62%, 30%, 0.97);
    --primary-800: hsla(78, 63%, 20%, 0.98);
    --primary-900: hsla(77, 61%, 10%, 0.99);
    --primary-950: hsla(79, 62%, 5%, 0.99);

    /* Accent colors with vibrancy */
    --secondary-500: hsla(36, 47%, 50%, 0.9);
    --accent-500: hsla(52, 46%, 50%, 0.9);
    --success-500: hsla(158, 64%, 40%, 0.9);
    --error-500: hsla(0, 84%, 60%, 0.9);

    /* Glass effect overrides */
    --glass-background: var(--glass-background-light);
    --glass-border: var(--glass-border-light);

        
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
};

