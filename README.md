# Sumit Singh — Modern 3D Personal Portfolio & Technical Archive

An interactive, high-performance personal portfolio built for **Sumit Singh** (Computer Engineering Student, Full-Stack Developer, and AI/ML Enthusiast at TCET Mumbai). Powered by **React 19**, **Three.js / React Three Fiber**, **GSAP**, and **Vite**.

![Sumit Singh Portfolio](public/favicon.svg)

---

## ⚡ Highlights

- **Interactive 3D Singularity Core**: Custom aerospace gunmetal singularity mechanical core rendered in WebGL using Three.js & R3F, featuring dynamic mouse parallax, ref-based scroll tracking, and Draco geometry compression (~770 KB optimized payload).
- **Smooth Cinematic Motion**: GSAP ScrollTrigger paired with Lenis smooth scroll for a fluid, responsive 60 FPS experience.
- **Architectural Project Showcase**: High-density engineering registers featuring systems architecture breakdowns for **FraudShieldAI**, **Employee Management System**, **OLAP Studio**, and **Result Analytics**.
- **Verified Credentials**: Instant verification and direct access for industry credentials from **Cisco Networking Academy**, **Infosys Springboard**, and **HackerRank**.
- **Integrated ATS Résumé System**: Native streaming download headers and direct asset access.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`, Draco Compression
- **Animation**: GSAP (GreenSock), ScrollTrigger
- **Scrolling**: Lenis Smooth Scroll
- **Bundler & Tooling**: Vite 8, Oxlint

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/sumit18-ai/personal-portfolio.git

# Navigate to project directory
cd personal-portfolio

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
# Compile and bundle for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📂 Project Structure

```
├── public/
│   ├── certificates/     # Verified accreditation documents & images
│   ├── draco/            # Draco WASM decoders
│   ├── models/aeris-core/# Draco-compressed 3D mechanical core asset
│   └── Sumit_Singh_ATS_Resume.pdf # Downloadable ATS Résumé
├── src/
│   ├── components/
│   │   ├── 3d/           # Three.js canvas, lighting, shader energy & scene hierarchy
│   │   ├── About/        # About & background
│   │   ├── Certifications/ # Technical credentials register
│   │   ├── Contact/      # Contact & communication hub
│   │   ├── Experience/   # Professional experience timeline
│   │   ├── Hero/         # Hero section with interactive 3D core
│   │   ├── Navbar/       # Navigation bar & status
│   │   ├── Projects/     # Technical projects & architectural breakdown
│   │   └── Skills/       # Core technical skills & competencies
│   ├── data/             # Centralized structured data registers
│   ├── App.tsx           # Main application composition
│   └── main.tsx          # Application entry point
├── package.json
└── vite.config.js
```

---

## 👤 Author

**Sumit Singh**
- **LinkedIn**: [singhsumit200905](https://www.linkedin.com/in/singhsumit200905/)
- **GitHub**: [@sumit18-ai](https://github.com/sumit18-ai)
- **Email**: singhsumitas200905@gmail.com
