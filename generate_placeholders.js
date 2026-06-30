const fs = require('fs');
const path = require('path');

// Helper to create directory
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const baseDir = 'g:\\projets live 26\\EternalHome';
const productsDir = path.join(baseDir, 'images', 'products');
const galleryDir = path.join(baseDir, 'images', 'gallery');
const brandsDir = path.join(baseDir, 'images', 'brands');
const logoDir = path.join(baseDir, 'images', 'logo');

ensureDir(productsDir);
ensureDir(galleryDir);
ensureDir(brandsDir);
ensureDir(logoDir);

// SVG generator functions
function createProductSVG(name, category, price) {
  return `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E1624"/>
        <stop offset="100%" stop-color="#162238"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#856404"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg)"/>
    <rect x="20" y="20" width="760" height="560" fill="none" stroke="url(#gold)" stroke-width="2" rx="8" opacity="0.4"/>
    
    <!-- Decorative curves -->
    <path d="M 20 150 C 300 80, 500 250, 780 150" fill="none" stroke="url(#gold)" stroke-width="1" opacity="0.2"/>
    <path d="M 20 450 C 300 380, 500 550, 780 450" fill="none" stroke="url(#gold)" stroke-width="1" opacity="0.2"/>
    
    <text x="50%" y="280" font-family="'Playfair Display', Georgia, serif" font-size="32" fill="#F8FAFC" font-weight="bold" text-anchor="middle" letter-spacing="2">${name}</text>
    <text x="50%" y="330" font-family="'Montserrat', sans-serif" font-size="18" fill="#D4AF37" font-weight="600" text-anchor="middle" letter-spacing="4">${category.toUpperCase()}</text>
    <text x="50%" y="380" font-family="'Poppins', sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">Premium Luxury Collection</text>
    
    <circle cx="400" cy="180" r="40" fill="rgba(212, 175, 55, 0.1)" stroke="#D4AF37" stroke-width="1.5"/>
    <path d="M 390 180 L 410 180 M 400 170 L 400 190" stroke="#D4AF37" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function createGallerySVG(name) {
  return `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#080C14"/>
        <stop offset="100%" stop-color="#0E1624"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#AA8B2C"/>
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="url(#bg)"/>
    <rect x="25" y="25" width="750" height="750" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.3"/>
    
    <text x="50%" y="400" font-family="'Playfair Display', Georgia, serif" font-size="36" fill="#F8FAFC" font-weight="bold" text-anchor="middle" letter-spacing="2">${name}</text>
    <text x="50%" y="450" font-family="'Montserrat', sans-serif" font-size="14" fill="#D4AF37" font-weight="600" text-anchor="middle" letter-spacing="5">ETERNAL SHOWROOM</text>
  </svg>`;
}

function createBrandSVG(name) {
  return `<svg width="300" height="150" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="150" fill="transparent"/>
    <rect x="10" y="10" width="280" height="130" fill="none" stroke="rgba(212, 175, 55, 0.2)" stroke-width="1" rx="6"/>
    <text x="50%" y="85" font-family="'Playfair Display', Georgia, serif" font-size="28" fill="#F8FAFC" font-weight="bold" text-anchor="middle" letter-spacing="3">${name}</text>
  </svg>`;
}

function createLogoSVG() {
  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="#D4AF37" stroke-width="3"/>
    <path d="M 70 80 L 100 50 L 130 80" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 80 110 L 100 90 L 120 110" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round"/>
    <text x="50%" y="150" font-family="'Montserrat', sans-serif" font-size="16" fill="#F8FAFC" font-weight="700" text-anchor="middle" letter-spacing="3">ETERNAL</text>
  </svg>`;
}

// Generate files
const products = [
  { file: 'statuario_marble.svg', name: 'Royal Statuario Marble', cat: 'Tiles' },
  { file: 'gold_shower.svg', name: 'Aura Premium Gold Shower', cat: 'Showers' },
  { file: 'black_mixer.svg', name: 'Cascade Matte Black Mixer', cat: 'Faucets' },
  { file: 'emerald_tile.svg', name: 'Emperor Emerald Tile', cat: 'Tiles' },
  { file: 'rock_basin.svg', name: 'Volcanic Rock Basin', cat: 'Wash Basins' },
  { file: 'smart_closet.svg', name: 'Integra Smart Closet', cat: 'Sanitaryware' },
  { file: 'rosegold_sink.svg', name: 'Rose Gold Kitchen Sink', cat: 'Kitchen Sinks' },
  { file: 'bathroom_set.svg', name: 'Minimalist Brass Hook Set', cat: 'Accessories' },
  { file: 'slate_tile.svg', name: 'Grandeur Slate Tiles', cat: 'Tiles' },
  { file: 'onyx_hex.svg', name: 'Onyx Gold Hexagonal Accent', cat: 'Tiles' },
  { file: 'pedestal_basin.svg', name: 'Verona Classic Pedestal Basin', cat: 'Wash Basins' },
  { file: 'sensor_faucet.svg', name: 'Fortress Smart Sensor Faucet', cat: 'Faucets' }
];

products.forEach(p => {
  fs.writeFileSync(path.join(productsDir, p.file), createProductSVG(p.name, p.cat));
  // Create detail images too
  const baseName = path.basename(p.file, '.svg');
  fs.writeFileSync(path.join(productsDir, `${baseName}_detail.svg`), createProductSVG(`${p.name} Detail`, p.cat));
  fs.writeFileSync(path.join(productsDir, `${baseName}_room.svg`), createProductSVG(`${p.name} in Room`, p.cat));
});

// Extra detail pages referenced in statuario_marble
fs.writeFileSync(path.join(productsDir, 'statuario_living.svg'), createProductSVG('Statuario Living Room View', 'Tiles'));

const galleryItems = [
  'gallery_tiles.svg',
  'gallery_bathrooms.svg',
  'gallery_showroom.svg',
  'gallery_interiors.svg',
  'gallery_kitchen.svg',
  'gallery_washbasin.svg'
];

galleryItems.forEach(item => {
  const label = item.replace('gallery_', '').replace('.svg', '').toUpperCase();
  fs.writeFileSync(path.join(galleryDir, item), createGallerySVG(label));
});

const brands = [
  'Jaquar', 'Duragres', 'Kajaria', 'Somany', 'Cera', 'Parryware', 'Hindware', 'Johnson', 'Orientbell', 'Asian Granito'
];

brands.forEach(b => {
  const fileName = `logo_${b.toLowerCase().replace(' ', '_')}.svg`;
  fs.writeFileSync(path.join(brandsDir, fileName), createBrandSVG(b));
});

fs.writeFileSync(path.join(logoDir, 'logo.svg'), createLogoSVG());

console.log('All SVGs generated successfully.');
