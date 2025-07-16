# kaushikreddy.me (v2)

A modern, responsive portfolio website built with Remix, TypeScript, and Tailwind CSS. Features dynamic content management through Contentful CMS and smooth animations for an engaging user experience.

## Features
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dynamic Content**: Projects and skills managed through Contentful CMS
- **Smooth Animations**: Page transitions and staggered element animations
- **Contact Form**: Integrated contact form with email functionality
- **Dark Theme**: Modern dark theme with green accent colors
- **Project Search**: Filter and search through projects
- **SEO Optimized**: Proper meta tags and structured data

## Tech Stack
- **Framework**: [Remix](https://remix.run/) - Full-stack web framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **CMS**: [Contentful](https://www.contentful.com/) - Headless content management
- **Icons**: [Remix Icons](https://remixicon.com/) - Clean and elegant icons
- **Animations**: [Lottie React](https://lottiefiles.com/) - Smooth animations
- **Email**: [Resend](https://resend.com/) - Email delivery service

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/kaushikreddy/kaushikreddy.me-v2.git
cd kaushikreddy.me-v2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
RESEND_API_KEY=your_resend_api_key
```

### Development Server
Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Other Commands
```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure
```
app/
├── components/         # React components
│   ├── NavBar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   ├── Projects.tsx    # Projects showcase
│   └── ...             # Other Components
├── routes/             # Remix routes
│   ├── _index.tsx      # Home page
│   ├── projects.tsx    # Projects page
│   └── api...          # API Files
├── services/           # External service integrations
│   └── contentful.server.ts
├── types/              # TypeScript type definitions
│   └── contentful.ts
├── lib/                # Utility functions
│   └── contentful.ts
├── root.tsx            # RootLayout
└── tailwind.css        # TailwindCSS
```

## 🎨 Customization

### Content Management
1. **Contentful Setup**: Create content models for Projects and Skills
2. **Project Model**: Include fields for name, description, tech stack, GitHub link, Website Link and cover image
3. **Skills Model**: Include fields for skill name, proficiency level, and category

### Styling
- Modify `tailwind.config.ts` for custom theme colors
- Update component styles in individual `.tsx` files
- Add custom CSS in `app/tailwind.css`

### Contact Form
- Configure email templates in the contact API route
- Update form validation rules
- Customize success/error messages

## 📱 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any Node.js hosting platform:
```bash
npm run build
npm start
```

## 🔧 Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `CONTENTFUL_SPACE_ID` | Contentful space identifier | Yes |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful delivery API token | Yes |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Contentful preview API token | Yes |
| `RESEND_API_KEY` | Resend email service API key | Yes |

## 📄 License
This project is licensed under the KAUSHIK REDDY PERSONAL USE LICENSE, Version 1.0 (July 2025).  See [LICENSE](./LICENSE) for details.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Juzcallmekaushik/v2/issues).

## 📧 Contact
Kaushik Reddy - [kaushikreddy1206@gmail.com](mailto:kaushikreddy1206@gmail.com)

Project Link: [https://github.com/Juzcallekaushik/v2](https://github.com/Juzcallmekaushik/v2)
---

**Built by Kaushik Reddy with Remix**
