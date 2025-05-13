## Description

Next.js Shadcn AI Components is a modern web application showcasing the integration of AI capabilities with elegant UI components. This project demonstrates:

- Dynamic AI-powered interactions
- Responsive and accessible UI components
- Modern development practices with TypeScript
- Component-driven architecture using Shadcn
- Real-time data processing with AI models

The application serves as a boilerplate for building AI-enhanced web applications with a focus on user experience and performance.

## Tech Stack

- [Prisma](https://www.prisma.io/docs)
- [Next.js](https://nextjs.org/docs)
- [Shadcn](https://www.shadcn.com/docs)
- [Xtartapp AI](https://www.xtartapp.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Vitest](https://vitest.dev/guide/)

## Requirements

- Node.js v18+
- Docker

## Installation

1. Clone the repository

```bash
git clone https://github.com/rygrams/nextjs-shadcn-ai.git
cd commerce-ai
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file

```bash
cp .env.example .env
```

4. Setup Prisma

```bash
pnpm prisma generate
pnpm prisma db push
```

5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser
