/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.01em' }],
                sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.01em' }],
                base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],
                lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
                xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '8xl': ['5.25rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '9xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
            },
            fontFamily: {
                heading: ["Inter"],
                paragraph: ["Inter"],
                inter: ["Inter", "sans-serif"]
            },
            colors: {
                primary: '#4A90E2',
                secondary: '#1A2332',
                accent: '#E8E8E8',
                background: '#0A0E1A',
                foreground: '#FFFFFF',
                muted: '#2A3447',
                'muted-foreground': '#9CA3AF',
                card: '#151B2B',
                'card-foreground': '#FFFFFF',
                border: '#2A3447',
                'primary-foreground': '#FFFFFF',
                'secondary-foreground': '#FFFFFF',
                'accent-foreground': '#0A0E1A',
                destructive: '#DC2626',
                'destructive-foreground': '#FFFFFF',
                link: '#4A90E2'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
