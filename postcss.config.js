// PostCSS is only responsible for Tailwind processing here. Keeping this file
// minimal reduces build-tooling surprises during upgrades.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
