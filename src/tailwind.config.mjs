/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.04em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.03em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "500" }],
                xl: ["1.25rem", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "600" }],
                "2xl": ["1.5rem", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "600" }],
                "3xl": ["1.875rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "700" }],
                "4xl": ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "700" }],
                "5xl": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "800" }],
                "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "800" }],
                "7xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.05em", fontWeight: "900" }],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.06em", fontWeight: "900" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.07em", fontWeight: "900" }],
            },
            fontFamily: {
                heading: ["space grotesk"],
                paragraph: ["azeret-mono"],
                pompeii: ["pompeii-new-regular"]
            },
            colors: {
                "deep-red": "#A41E2E",
                "warm-gold": "#D4AF37",
                "sage-green": "#8B9E7F",
                "light-sage": "#D4DDD0",
                "cream-bg": "#F9F7F3",
                "warm-beige": "#E8DCC8",
                destructive: "#A41E2E",
                "destructive-foreground": "#FFFFFF",
                background: "#0F0F0F",
                secondary: "#D4AF37",
                foreground: "#FFFFFF",
                "secondary-foreground": "#0F0F0F",
                "primary-foreground": "#0F0F0F",
                primary: "#D4AF37",
                textprimary: "#FFFFFF",
                darkbackground: "#1A1A1A",
                forgrounde: "#FFFFFF",
                textsecondary: "#D4AF37",
                "neon-accent": "#D4AF37",
                "black-bg": "#0F0F0F",
                "dark-gray": "#1A1A1A",
                "light-text": "#FFFFFF",
                "gold-accent": "#D4AF37"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
