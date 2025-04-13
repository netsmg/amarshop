# NVault

[Demo](https://nvault.netlify.app)

A modern NFT marketplace built with SvelteKit 2, featuring smooth animations and a sleek design. This project demonstrates best practices in building a responsive, animated web application with modern web technologies.

## Features

- 🎨 Modern UI with GSAP animations
- 🔄 Smooth page transitions
- 📱 Fully responsive design
- ⚡ Fast loading with SvelteKit
- 🧪 Complete test suite
- 💅 Custom animations including:
  - Text decode effect
  - Scroll-triggered reveals
  - Border animations

## Tech Stack

- **Framework**: SvelteKit 2.18
- **UI/Animations**: GSAP 3.12
- **Styling**: PostCSS
- **Icons**: Unplugin Icons
- **Testing**:
  - Vitest for unit testing
  - Playwright for E2E testing
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, pnpm, or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/wentallout/nvault.git
cd nvault
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open <http://localhost:5173> in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run all tests
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run lint` - Check code formatting
- `npm run format` - Format code with Prettier

## Project Structure

```
nvault/
├── src/
│   ├── lib/
│   │   ├── actions/     # Svelte actions (animations)
│   │   ├── components/  # Reusable components
│   │   ├── icons/      # SVG icons
│   │   ├── sections/   # Page sections
│   │   ├── styles/     # Global styles
│   │   └── layout/     # Layout components
│   ├── routes/         # SvelteKit routes
│   └── app.html        # HTML template
├── static/             # Static assets
├── tests/             # Test files
└── vite.config.ts     # Vite configuration
```

## Animation System

NVault features three main types of animations:

1. **Decode Animation** (`decodeAnimation`):

   - Matrix-style text scramble effect
   - Triggered on scroll
   - Customizable duration and characters

2. **Reveal Animation** (`revealAnimation`):

   - Smooth fade-in and slide-up effect
   - Scroll-triggered
   - Used for section reveals

3. **Border Animation** (`borderAnimation`):
   - Animated border drawing effect
   - Triggered on scroll
   - Used for section boundaries

## Development Guidelines

- Use TypeScript for all new files
- Follow the existing component structure
- Add tests for new features
- Use GSAP for complex animations
- Follow the existing styling patterns

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from [Studio Site](https://preview.studio.site/templates/18dO8G5WnG)
- Color palette generated with [Hover Dev](https://www.hover.dev/css-color-palette-generator)
- Favicon generated at: [favicon.io](https://favicon.io/favicon-converter)
