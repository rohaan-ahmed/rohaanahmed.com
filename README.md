# Personal Website

A dark-themed, cyberpunk/neon personal website built with vanilla HTML, CSS, and JavaScript.

## Features

- **Cyberpunk Aesthetic**: Dark theme with neon cyan, magenta, and purple accents
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-triggered animations, hover effects, and glowing neon elements
- **Single Page**: All content on one page with smooth scrolling navigation
- **No Build Tools**: Simple files that work directly in any browser

## Sections

1. **Hero** - Animated title with gradient background
2. **About** - Bio and focus area cards (AI, Advanced Technologies, Space, Defence)
3. **Projects** - Grid of project cards with hover effects
4. **Contact** - Links and contact form placeholder

## File Structure

```
website/
├── index.html    # Main HTML structure
├── styles.css    # All styling and animations
├── script.js     # Interactivity and smooth scrolling
└── README.md     # This file
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Customize the placeholder content with your information

## Customization

### Update Personal Information
- Edit `index.html` to replace placeholder text with your name, bio, and project details
- Update contact links (email, LinkedIn, GitHub)

### Colors
Colors are defined as CSS custom properties in `styles.css`:
```css
--accent-cyan: #00ffff;
--accent-magenta: #ff00ff;
--accent-purple: #8b5cf6;
```

### Contact Form
To enable the contact form, integrate with a service like [Formspree](https://formspree.io/) or [Netlify Forms](https://www.netlify.com/products/forms/).

## Hosting on GitHub Pages

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch" and choose `main`
4. Your site will be live at `https://yourusername.github.io/repository-name`

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT License - feel free to use and modify for your own projects.
