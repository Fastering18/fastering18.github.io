# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive
- 🌙 Dark mode support
- ⚡ Fast page loads
- 🎭 Smooth animations with Framer Motion
- 📝 Contact form
- 🔍 SEO optimized

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Export static files:
   ```bash
   npm run export
   ```

The static files will be generated in the `out` directory.

## Deployment

This project is configured for deployment to GitHub Pages. The deployment is automated using GitHub Actions.

1. Push your changes to the `design2025` branch:
   ```bash
   git push origin design2025
   ```

2. The GitHub Action will automatically build and deploy your site to the `gh-pages` branch.

## Customization

1. Update personal information in the components:
   - `components/sections/Home.tsx`
   - `components/sections/About.tsx`
   - `components/sections/Projects.tsx`
   - `components/sections/Contact.tsx`

2. Modify the theme in `tailwind.config.js`

3. Add your own images to the `public` directory

## License

MIT License - feel free to use this template for your own portfolio! 