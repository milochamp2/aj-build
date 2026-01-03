# Modern Dashboard

A modern, responsive dashboard built with Next.js, React, TypeScript, Tailwind CSS, and Recharts.

## Features

- **Finance Dashboard**: Track revenue, expenses, and financial performance with interactive charts
- **Team Dashboard**: Manage team members, view performance metrics, and monitor department statistics
- **AI Works Dashboard**: Monitor AI projects, model performance, and training metrics
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Modern UI**: Clean, professional interface with smooth transitions and hover effects

## Tech Stack

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Composable charting library
- **Lucide React**: Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd dashboard-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and configure settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. For production deployment:

```bash
vercel --prod
```

## Project Structure

```
dashboard-app/
├── app/
│   ├── finance/
│   │   └── page.tsx         # Finance dashboard
│   ├── team/
│   │   └── page.tsx         # Team dashboard
│   ├── ai-works/
│   │   └── page.tsx         # AI Works dashboard
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   └── Sidebar.tsx          # Navigation sidebar
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Features Overview

### Dashboard Home
- Quick stats overview
- Navigation to all sections
- Recent activity feed
- Quick action cards

### Finance Section
- Revenue vs Expenses line chart
- Monthly profit bar chart
- Expense breakdown pie chart
- Financial metrics and KPIs

### Team Section
- Team member cards with performance metrics
- Department statistics bar chart
- Team skills radar chart
- Searchable team member table

### AI Works Section
- Model performance trends
- Project status overview
- Training progress charts
- AI project tracking table

## Customization

### Modify Data

All dashboard data is currently static and defined within each page component. To connect to real data:

1. Create API routes in `app/api/`
2. Fetch data using React hooks (useState, useEffect)
3. Replace static data with API calls

### Update Styling

- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Adjust component-level classes in individual files

### Add New Sections

1. Create a new folder in `app/` (e.g., `app/analytics/`)
2. Add a `page.tsx` file
3. Update navigation in `components/Sidebar.tsx`

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
