# Lexington Commons HOA Management Platform

A modern, secure web application for managing homeowner association operations, designed specifically for Lexington Commons HOA in West Columbia, SC.

## 🏘️ About

The Lexington Commons HOA platform streamlines community management by providing:

- **Public Access**: Community information, amenities, and public announcements
- **Resident Portal**: Secure access for property owners and tenants to manage profiles, view bulletins, and communicate with the board
- **Board Management**: Comprehensive tools for HOA board members to manage residents, post updates, and oversee community operations

## 🎯 Key Features

### For Residents & Property Owners
- **Community Updates**: View targeted announcements and bulletins
- **Amenity Information**: Pool, clubhouse, and playground details with guidelines
- **Contact Information**: Easy access to board contact and mailing information
- **User Profiles**: Manage personal information and property details
- **Secure Authentication**: Email-verified accounts with role-based access

### For Board Members
- **Content Management**: Post and manage bulletins for different audience groups
- **Resident Management**: Comprehensive CRM for property owners and tenants
- **Role-Based Permissions**: President, Secretary, Treasurer, and Media roles with appropriate access levels
- **Communication Tools**: Targeted messaging to residents, owners, or board members
- **Query Management**: Handle resident requests and support tickets

## 🛠️ Technology Stack

### Frontend
- **React 18+** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **TailwindCSS** with custom grass green theme for natural, community-focused design
- **Apollo Client** for GraphQL state management and real-time updates
- **React Router v6** for client-side navigation
- **React Hook Form + Zod** for form handling and validation

### Backend (AWS Serverless)
- **AWS AppSync** for GraphQL API with real-time subscriptions
- **AWS Cognito** for secure authentication and role-based authorization  
- **AWS Lambda** for serverless business logic
- **AWS RDS (PostgreSQL)** for reliable data storage
- **AWS S3 + CloudFront** for file storage and content delivery

### DevOps & Security
- **AWS CDK** for Infrastructure as Code
- **GitHub Actions** for CI/CD
- **ESLint + Prettier** for code quality
- **Husky + lint-staged** for pre-commit hooks
- **Comprehensive security practices** with encryption and access controls

## 🎨 Design Philosophy

### Mobile-First Approach
- Responsive design optimized for phone usage (primary user base)
- Sticky navigation for easy access while scrolling
- Touch-friendly interface elements
- Fast loading on mobile networks

### Community-Focused Branding
- Natural grass green color palette (#A1E897, #35AB26)
- Professional yet welcoming design
- Accessible color contrasts and typography
- Clean, intuitive user experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git for version control
- AWS CLI configured (for backend deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/lexag-hoa.git
   cd lexag-hoa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp aws-config.env .env.local
   # Edit .env.local with your AWS configuration
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI primitives
│   ├── layout/         # Navigation and layout components
│   ├── auth/           # Authentication components
│   └── bulletins/      # Bulletin-related components
├── pages/              # Page components (route handlers)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── graphql/            # GraphQL operations
├── styles/             # Global styles and Tailwind configuration
└── types/              # TypeScript type definitions

public/images/          # Static assets
├── home/              # Homepage welcome images
├── amenities/         # Community facility photos
└── logos/             # Branding assets
```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality  
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing
- `npm test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report

## 🌟 Development Highlights

### Phase 1: Foundation Complete ✅
- ✅ Mobile-first responsive design
- ✅ Complete navigation system
- ✅ Static page implementation
- ✅ Custom grass green branding
- ✅ Image optimization and responsive containers
- ✅ TypeScript integration
- ✅ Component architecture

### Phase 1: Backend Integration (In Progress)
- 🔄 AWS Cognito authentication
- 🔄 GraphQL API integration
- 🔄 Real bulletin data with infinite scroll
- 🔄 Role-based content filtering
- 🔄 Real-time updates via subscriptions

## 🔐 Security Features

- **Authentication**: AWS Cognito with email verification
- **Authorization**: Role-based access control (residents, owners, board, president)
- **Data Protection**: Encrypted data transmission and storage
- **Input Validation**: Comprehensive validation using Zod schemas
- **Security Headers**: Proper security headers and CSP policies

## 🏗️ Architecture Decisions

### Why React + TypeScript?
- Type safety reduces bugs and improves developer experience
- Large ecosystem and community support
- Excellent performance with modern React features

### Why AWS Serverless?
- Cost-effective for HOA-scale applications
- Automatic scaling and high availability
- Reduced operational overhead
- Enterprise-grade security and compliance

### Why GraphQL?
- Efficient data fetching with single requests
- Real-time updates with subscriptions
- Strong typing and introspection
- Flexible querying for different user roles

## 📞 Contact & Support

**Lexington Commons HOA**  
📧 Email: info@lexingtoncommons-weco.com  
📍 Address: 1250 Hulon Circle, W. Columbia, SC 29169

For technical issues or feature requests, please contact the development team through the HOA board.

## 📋 Development Status

- **Frontend**: Phase 1 complete, ready for backend integration
- **Backend**: Infrastructure planning complete, development in progress
- **Testing**: Unit testing framework setup, integration tests pending
- **Deployment**: GitHub Actions CI/CD configured, AWS deployment pending

## 🤝 Contributing

This is a private project for Lexington Commons HOA. Development is managed by the HOA board and authorized developers.

### Development Workflow
1. Create feature branch from `dev`
2. Implement changes with tests
3. Submit pull request with description
4. Code review and approval required
5. Merge to `dev`, then deploy to staging
6. Board approval for production deployment

## 📄 License

Private software for Lexington Commons HOA. Not licensed for public use.

---

**Built with ❤️ for the Lexington Commons community**
