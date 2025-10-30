# Looci's Bachata Portfolio

A beautiful, modern portfolio website for Lucy (Looci), a professional bachata instructor. Features a stunning rose-gold color scheme, dark theme design, and fully responsive layout.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📄 Pages

- **Home** (`/`) - Hero section, bio, class offerings, testimonials
- **Gallery** (`/gallery`) - Photo gallery with filters
- **Classes** (`/classes`) - Calendar and booking system
- **Contact** (`/contact`) - Contact form and information

## 🎨 Design Features

- Rose-gold (#B76E79) and wine gradient color scheme
- Glass morphism effects
- Smooth transitions and animations
- Mobile-responsive navigation
- Next.js optimized images

## 🛠️ Tech Stack

- Next.js 16 (Pages Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Biome (linter/formatter)

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
npm run format   # Format code
```

## 📂 Project Structure

```
src/
├── common/components/    # Reusable UI components
├── screens/             # Page-level components
└── pages/               # Next.js routes
```

## 📸 Images

Lucy's photos and logos are in `public/images/`:
- `/images/lucy/` - Instructor photos (5 images)
- `/images/logos/` - Brand logos (3 variations)

## 🎯 Customization

To update content:
1. Edit screens in `src/screens/`
2. Update contact info in `src/screens/contact/index.tsx`
3. Add/remove photos in `public/images/lucy/`
4. Modify testimonials in `src/screens/home/index.tsx`

## 🔜 Backend Integration

Forms are ready for backend integration:
- Contact form submission
- Class booking system
- Calendar event management

## 📚 Documentation

See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for detailed implementation guide.

---

**Built for Looci's Bachata Studio** 💃🕺
