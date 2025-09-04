# Technical Stack

## Frontend Application
- App Framework: React 18+ (Single Page Application)
- Language: JavaScript/TypeScript
- Build Tool: Vite
- Package Manager: npm
- Node Version: 22 LTS

## Styling & UI
- CSS Framework: TailwindCSS 4.0+
- UI Components: shadcn/ui or Headless UI
- Font Provider: Google Fonts
- Font Loading: Self-hosted for performance
- Icons: Lucide React components

## Data & API
- GraphQL Frontend: Apollo Client with React hooks and caching
- GraphQL Backend: AWS AppSync with real-time subscriptions
- HTTP Client: Apollo Client (GraphQL) + Axios (REST fallback)

## Backend & Database
- API Backend: AWS Lambda + API Gateway
- Database: AWS RDS (PostgreSQL) for structured HOA data
- Database Backups: AWS automated backups
- Authentication: AWS Cognito with role-based permissions

## Hosting & Infrastructure
- Application Hosting: AWS Amplify
- Asset Storage: Amazon S3
- CDN: AWS CloudFront
- Asset Access: Public with CloudFront, private with signed URLs
- Environment Variables: AWS Systems Manager Parameter Store

## Development & Quality
- Tests: Vitest for unit tests, Playwright for E2E
- Code Quality: ESLint + Prettier for linting/formatting
- Pre-commit: Husky + lint-staged for code quality gates
- Development Tools: React Developer Tools, Apollo Client DevTools

## Application Features
- State Management: React Context API or Zustand for complex state
- Form Handling: React Hook Form with Zod validation
- Date/Time: date-fns for date manipulation
- SEO/Meta: React Helmet Async for head management
- Routing: React Router v6+ for client-side navigation
- Loading States: React Suspense for async components
- Performance: React.memo, useMemo, useCallback for optimization

## Deployment & Monitoring
- CI/CD Platform: GitHub Actions with AWS deployment
- CI/CD Trigger: Push to main/staging branches
- Production Environment: main branch → AWS Amplify
- Staging Environment: staging branch → separate AWS environment
- Monitoring: AWS CloudWatch + AWS X-Ray for tracing
- Error Tracking: Sentry or AWS CloudWatch Insights

## Repository Structure
- Code Repository: Git repository named "lexag"
- Frontend Path: `/frontend/lexag`
- Backend Path: `/backend` (AWS infrastructure code)
