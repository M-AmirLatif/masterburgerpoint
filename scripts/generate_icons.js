const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#241B17" />
      <stop offset="70%" stop-color="#140F0D" />
      <stop offset="100%" stop-color="#080605" />
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE885" />
      <stop offset="45%" stop-color="#FFC20E" />
      <stop offset="100%" stop-color="#D99B00" />
    </linearGradient>
    <linearGradient id="bunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="pattyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5B230B" />
      <stop offset="100%" stop-color="#361203" />
    </linearGradient>
    <linearGradient id="cheeseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#EAB308" />
    </linearGradient>
  </defs>

  <!-- Circular Badge Base -->
  <circle cx="256" cy="256" r="246" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="16" />
  <circle cx="256" cy="256" r="228" fill="none" stroke="#DC2626" stroke-width="4" stroke-dasharray="10 6" opacity="0.85" />

  <!-- Master Golden Crown on Top -->
  <g transform="translate(256, 115)">
    <path d="M-80 12 L-65 -45 L-20 -15 L0 -62 L20 -15 L65 -45 L80 12 Z" fill="url(#goldGrad)" stroke="#8A6000" stroke-width="4" stroke-linejoin="round" />
    <circle cx="-65" cy="-45" r="8" fill="#DC2626" stroke="#FFE885" stroke-width="3" />
    <circle cx="0" cy="-62" r="10" fill="#DC2626" stroke="#FFE885" stroke-width="3.5" />
    <circle cx="65" cy="-45" r="8" fill="#DC2626" stroke="#FFE885" stroke-width="3" />
    <!-- Crown headband -->
    <rect x="-80" y="12" width="160" height="18" rx="5" fill="url(#goldGrad)" stroke="#8A6000" stroke-width="3" />
    <circle cx="-50" cy="21" r="4.5" fill="#DC2626" />
    <circle cx="0" cy="21" r="5" fill="#FFFFFF" />
    <circle cx="50" cy="21" r="4.5" fill="#DC2626" />
  </g>

  <!-- Big Delicious Master Burger -->
  <g transform="translate(256, 276)">
    <!-- Top Bun -->
    <path d="M-140 -28 C-140 -115 140 -115 140 -28 C140 -18 -140 -18 -140 -28 Z" fill="url(#bunGrad)" stroke="#B45309" stroke-width="6" />
    <!-- Sesame Seeds -->
    <ellipse cx="-75" cy="-70" rx="8" ry="4.5" fill="#FFFBEB" transform="rotate(-15 -75 -70)" />
    <ellipse cx="-25" cy="-85" rx="9" ry="5" fill="#FFFBEB" transform="rotate(10 -25 -85)" />
    <ellipse cx="38" cy="-82" rx="8.5" ry="4.5" fill="#FFFBEB" transform="rotate(-20 38 -82)" />
    <ellipse cx="85" cy="-62" rx="8" ry="4.5" fill="#FFFBEB" transform="rotate(15 85 -62)" />
    <ellipse cx="0" cy="-52" rx="9" ry="5" fill="#FFFBEB" />
    <ellipse cx="-55" cy="-42" rx="8" ry="4.5" fill="#FFFBEB" transform="rotate(-10 -55 -42)" />
    <ellipse cx="60" cy="-40" rx="8.5" ry="4.5" fill="#FFFBEB" transform="rotate(15 60 -40)" />

    <!-- Fresh Crisp Lettuce Wave -->
    <path d="M-146 -18 Q-125 -6 -104 -18 Q-83 -4 -62 -18 Q-41 -6 -20 -18 Q1 -4 22 -18 Q43 -6 64 -18 Q85 -4 106 -18 Q127 -6 146 -18 Q152 -6 142 5 Q120 18 98 4 Q76 18 54 4 Q32 18 10 4 Q-12 18 -34 4 Q-56 18 -78 4 Q-100 18 -122 4 Q-138 16 -146 5 Z" fill="#22C55E" stroke="#15803D" stroke-width="3.5" />

    <!-- Tomato Slices -->
    <rect x="-132" y="-4" width="126" height="20" rx="10" fill="#EF4444" stroke="#B91C1C" stroke-width="3" />
    <rect x="6" y="-4" width="126" height="20" rx="10" fill="#EF4444" stroke="#B91C1C" stroke-width="3" />

    <!-- Melting Cheddar Cheese with Delicious Drips -->
    <path d="M-138 12 L138 12 L125 32 L98 26 L76 54 L54 26 L-16 26 L-38 58 L-60 26 L-115 26 Z" fill="url(#cheeseGrad)" stroke="#CA8A04" stroke-width="3.5" />

    <!-- Juicy Grilled Patty -->
    <rect x="-138" y="24" width="276" height="46" rx="15" fill="url(#pattyGrad)" stroke="#220B03" stroke-width="4.5" />
    <!-- Grill marks -->
    <line x1="-80" y1="34" x2="-60" y2="60" stroke="#1A0702" stroke-width="4.5" stroke-linecap="round" opacity="0.6" />
    <line x1="-15" y1="34" x2="5" y2="60" stroke="#1A0702" stroke-width="4.5" stroke-linecap="round" opacity="0.6" />
    <line x1="50" y1="34" x2="70" y2="60" stroke="#1A0702" stroke-width="4.5" stroke-linecap="round" opacity="0.6" />

    <!-- Bottom Bun -->
    <path d="M-136 68 C-136 68 -136 102 -94 104 L94 104 C136 102 136 68 136 68 Z" fill="url(#bunGrad)" stroke="#B45309" stroke-width="5.5" />
  </g>

  <!-- Brand Label Ribbon Arc at Bottom -->
  <g transform="translate(256, 436)">
    <rect x="-182" y="-28" width="364" height="56" rx="28" fill="#FFC20E" stroke="#FFFFFF" stroke-width="4.5" />
    <text x="0" y="11" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-size="30" fill="#141414" text-anchor="middle" letter-spacing="1">
      MASTER BURGER
    </text>
  </g>
</svg>`;

async function run() {
  console.log('Writing public/favicon.svg...');
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), svg, 'utf8');

  console.log('Generating high-res PNG (512x512)...');
  const png512 = await sharp(Buffer.from(svg)).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.png'), png512);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon.png'), png512);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-512.png'), png512);

  console.log('Generating 192x192 PNG...');
  const png192 = await sharp(Buffer.from(svg)).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-192.png'), png192);

  console.log('Generating Apple Touch Icon (180x180)...');
  const png180 = await sharp(Buffer.from(svg)).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), png180);

  console.log('Generating 32x32 & 48x48 PNGs for multi-resolution favicon.ico...');
  const png16 = await sharp(Buffer.from(svg)).resize(16, 16).png().toBuffer();
  const png32 = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();
  const png48 = await sharp(Buffer.from(svg)).resize(48, 48).png().toBuffer();
  const png64 = await sharp(Buffer.from(svg)).resize(64, 64).png().toBuffer();

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-16x16.png'), png16);

  console.log('Writing multi-size ICO using Python PIL...');
  const pyCode = `
from PIL import Image
img = Image.open('src/app/icon.png')
img.save('src/app/favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
img.save('public/favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
print('Favicon.ico successfully written!')
`;
  execSync(`python -c "${pyCode}"`, { stdio: 'inherit' });

  console.log('All brand icons and favicons generated successfully!');
}

run().catch(console.error);
