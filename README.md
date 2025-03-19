# Finance Tracker 💰

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?logo=next.js)](https://nextjs.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.7.0-blue)](https://ui.shadcn.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com/)

A modern financial management application with real-time analytics and budget tracking, built using Next.js App Router and modern web technologies.

![App Preview](/public/screenshot.png) <!-- Add actual screenshot path -->

## Features ✨
- **Dashboard Analytics**: Interactive financial overview with Recharts
- **Transaction Management**: Full CRUD operations for income/expenses
- **Budget Control**: Category-specific budget limits with alerts
- **Data Validation**: Robust schema validation with Zod
- **Optimized Fetching**: TanStack Query for efficient data management
- **Modern UI**: shadcn/ui components with Tailwind styling

## Tech Stack 🛠️
- **Framework**: Next.js 14 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **Data Visualization**: Recharts
- **State Management**: TanStack Query v4
- **Database**: MongoDB + Mongoose
- **Validation**: Zod
- **HTTP Client**: Axios

## Installation ⚙️

### Prerequisites
- Node.js v18+
- MongoDB Atlas URI
- Git

```bash
git clone https://github.com/Theyaseenahmad/finance-tracker.git
cd finance-tracker
npm install

##Environment setup 
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=/api

##Project Structure

finance-tracker/
├── app/
│   ├── (routes)/
│   │   ├── budget/          # Budget page components
│   │   ├── categories/      # Category management
│   │   ├── dashboard/       # Analytics components
│   │   └── transactions/    # Transaction CRUD
│   ├── api/                 # API endpoints
│   │   ├── add-transaction/route.ts
│   │   ├── delete-transaction/route.ts
│   │   ├── get-budget/route.ts
│   │   ├── get-transactions/route.ts
│   │   ├── set-category-budget/route.ts
│   │   └── update-transaction/route.ts
├── components/
│   ├── manual-ui/           # Custom components
│   │   ├── sidebar/         # Navigation components
│   │   └── (route components)
│   └── shadcn/              # UI library components
├── lib/
│   ├── db/                  # MongoDB connection
│   ├── http/                # API client services
│   │   ├── Create-Transaction.ts
│   │   ├── Delete-Transaction.ts
│   │   ├── Get-Budget.ts
│   │   ├── Get-Transactions.ts
│   │   ├── Set-Category-budget.ts
│   │   └── Update-transaction.ts
│   ├── validators/          # Zod schemas
│   │   ├── CategoryBudgetSchema.ts
│   │   ├── TransactionSchema.ts
│   │   └── TransactionUpdateSchema.ts
└── public/                  # Static assets


API Endpoints 🔌
Endpoint	Method	Description
/api/add-transaction	POST	Create new transaction
/api/delete-transaction	DELETE	Remove transaction
/api/get-budget	GET	Fetch category budgets
/api/get-transactions	GET	Retrieve filtered transactions
/api/set-category-budget	POST	Update budget limits
/api/update-transaction	PUT	Modify existing transaction


npm run dev    # Start development server
npm run build  # Create production build
npm run lint   # Run ESLint checks