# Image Assets Directory

## Structure

```
public/images/
├── home/              # Homepage welcome images
│   ├── welcome-1.jpg  # Left/top welcome image
│   └── welcome-2.jpg  # Right/bottom welcome image
├── amenities/         # Amenities page images
│   ├── pool.jpg       # Swimming pool image
│   ├── clubhouse.jpg  # Community clubhouse image
│   └── playground.jpg # Kids playground image
└── logos/             # Logo and branding assets
    └── logo.svg       # HOA logo (if available)
```

## Usage in Components

Images in the public folder can be referenced directly:

```jsx
// Homepage welcome images
<img src="/images/home/welcome-1.jpg" alt="Welcome to Lexington Commons" />
<img src="/images/home/welcome-2.jpg" alt="Community Overview" />

// Amenities images  
<img src="/images/amenities/pool.jpg" alt="Community Swimming Pool" />
<img src="/images/amenities/clubhouse.jpg" alt="Community Clubhouse" />
<img src="/images/amenities/playground.jpg" alt="Kids Playground" />
```

## Image Guidelines

- **Format**: Use JPG for photos, PNG for graphics with transparency, WebP for optimized loading
- **Sizing**: Recommended dimensions:
  - Welcome images: 800x600px or 1200x900px for retina displays
  - Amenities images: 600x400px or 900x600px for retina displays
- **Optimization**: Compress images for web to keep file sizes under 500KB each
- **Alt text**: Always include descriptive alt text for accessibility

## Responsive Images

For better performance, consider using responsive image sets:

```jsx
<img 
  src="/images/home/welcome-1.jpg"
  srcSet="/images/home/welcome-1-small.jpg 400w, 
          /images/home/welcome-1.jpg 800w,
          /images/home/welcome-1-large.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Welcome to Lexington Commons"
/>
```
