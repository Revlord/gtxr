## About
The landing page for the Georgia Tech Extended Reality (GTXR) club, with information about club involvement, membership, and events.

## Technologies Used
- Next.js
- React
- Typescript
- HTML
- CSS + Tailwind
- Aceternity UI


## How to Run (WebSpatial App)

### 1. Clone the project

```bash
git clone https://github.com/Revlord/gtxr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. PWA & WebSpatial Requirements

- Ensure `public/manifest.json` and required icons (512x512, 1024x1024) exist for PWA compliance.
- Service worker is included for installability.
- The app is spatial-ready: key pages and components use spatial containers and clear backgrounds.
- For full spatial features, install the WebSpatial SDK and run in a compatible environment (see https://github.com/webspatial/webspatial-sdk for details).

### 5. Production Build

```bash
npm run build
npm run start
```

### 6. Notes
- For spatial features (gaze, pinch, 3D containers), use a compatible browser or device (e.g., visionOS, WebSpatial Browser).
- Content updates are managed via GitHub repo.
