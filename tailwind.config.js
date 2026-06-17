/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                'xs': '475px',
            },
            colors: {
                isotek: {
                    50: '#f5f7fb',
                    100: '#D5DCF2', // Lavanda claro
                    200: '#b6c4e8',
                    300: '#8FB2BF', // Azul-verde acinzentado
                    400: '#7790A6', // Azul-cinza médio
                    500: '#03A6A6', // Turquesa/Ciano (cor principal)
                    600: '#028a8a',
                    700: '#026e6e',
                    800: '#015252',
                    900: '#013636',
                    accent: '#03A6A6', // Turquesa
                    secondary: '#8FB2BF', // Azul suave
                    alert: '#F20505', // Vermelho para alertas
                    light: '#D5DCF2', // Lavanda
                    medium: '#7790A6', // Azul-cinza
                },
            },
        },
    },
    plugins: [],
}
