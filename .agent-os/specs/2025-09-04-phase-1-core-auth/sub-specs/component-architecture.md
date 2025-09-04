# Component Architecture

This document defines the React component structure and organization for Phase 1 implementation.

## Project Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI primitives (shadcn/ui style)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── layout/          # Layout-related components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Footer.tsx
│   ├── auth/            # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── AuthProvider.tsx
│   └── bulletins/       # Bulletin-related components
│       ├── BulletinCard.tsx
│       ├── BulletinList.tsx
│       ├── InfiniteScroll.tsx
│       └── TagFilter.tsx
├── pages/               # Page components (route handlers)
│   ├── HomePage.tsx
│   ├── AmenitiesPage.tsx
│   ├── ContactPage.tsx
│   ├── LoginPage.tsx
│   └── SignUpPage.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useBulletins.ts
│   └── useInfiniteScroll.ts
├── lib/                 # Utilities and configurations
│   ├── apollo.ts        # Apollo Client configuration
│   ├── auth.ts          # AWS Cognito configuration
│   ├── utils.ts         # General utility functions
│   └── constants.ts     # App constants and enums
├── graphql/             # GraphQL operations
│   ├── queries/
│   │   ├── bulletins.ts
│   │   └── users.ts
│   ├── mutations/
│   │   └── auth.ts
│   └── types.ts         # Generated TypeScript types
├── styles/              # Global styles
│   ├── globals.css      # Global CSS with Tailwind directives
│   └── components.css   # Component-specific styles
└── types/               # TypeScript type definitions
    ├── auth.ts
    ├── bulletin.ts
    └── api.ts
```

## Core Components

### Authentication Architecture

#### AuthProvider.tsx
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}
```

**Responsibilities:**
- Manage global authentication state
- Handle Cognito JWT token refresh
- Provide authentication methods to child components
- Integrate with Apollo Client for authenticated requests

#### ProtectedRoute.tsx
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserType;
  fallback?: React.ReactNode;
}
```

**Responsibilities:**
- Guard routes based on authentication status
- Optional role-based access control
- Redirect to login or show fallback component

### Layout Components

#### Header.tsx (Mobile-First)
```typescript
interface HeaderProps {
  user: User | null;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}
```

**Mobile Layout:**
- Full-width banner with HOA name
- Menu button (hamburger) on right
- Sticky positioning during scroll

**Desktop Layout:**
- Horizontal banner with logo on left
- Navigation menu on right (sign in/up or user dropdown)
- Maintains sticky behavior

#### Navigation.tsx
```typescript
interface NavigationProps {
  user: User | null;
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}
```

**Responsibilities:**
- Render different navigation based on screen size
- Handle authenticated vs unauthenticated states
- Smooth transitions and accessibility support

### Bulletin Components

#### BulletinList.tsx
```typescript
interface BulletinListProps {
  audience?: AudienceType;
  subjectTags?: string[];
  className?: string;
}
```

**Features:**
- Infinite scroll pagination using Apollo Client
- Loading states and error handling
- Responsive grid layout (mobile-first)
- Tag filtering integration

#### BulletinCard.tsx
```typescript
interface BulletinCardProps {
  bulletin: Bulletin;
  showAudience?: boolean;
  compact?: boolean;
}
```

**Styling:**
- Mobile-optimized card design
- Rich text content rendering with HTML sanitization
- Author information display
- Subject tags as clickable chips

#### InfiniteScroll.tsx
```typescript
interface InfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  threshold?: number;
}
```

**Implementation:**
- Intersection Observer API for performance
- Loading skeleton components
- Error boundary for failed loads
- Smooth scrolling behavior

## State Management

### Apollo Client Integration
```typescript
// lib/apollo.ts
const authLink = setContext((_, { headers }) => {
  const token = getCurrentUserToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listBulletinsForUser: {
            keyArgs: ["subjectTags"],
            merge: (existing, incoming) => {
              // Merge pagination results for infinite scroll
            }
          }
        }
      }
    }
  })
});
```

### Custom Hooks

#### useAuth.ts
```typescript
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

#### useBulletins.ts
```typescript
export const useBulletins = (audience?: AudienceType, tags?: string[]) => {
  const { data, loading, error, fetchMore } = useQuery(
    audience ? LIST_BULLETINS_FOR_USER : LIST_PUBLIC_BULLETINS,
    {
      variables: { limit: 20, subjectTags: tags },
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    bulletins: data?.items || [],
    loading,
    error,
    hasMore: !!data?.nextToken,
    loadMore: () => fetchMore({
      variables: { nextToken: data?.nextToken }
    })
  };
};
```

## Responsive Design Strategy

### Mobile-First Approach
- **Base styles**: Designed for 320px+ screens
- **Progressive enhancement**: Add desktop styles with `@media` queries
- **Touch-friendly**: 44px minimum touch targets
- **Performance**: Lazy load images and components

### Breakpoint System
```css
/* Mobile First - Base styles */
.component { /* mobile styles */ }

/* Tablet - 768px+ */
@media (min-width: 768px) {
  .component { /* tablet styles */ }
}

/* Desktop - 1024px+ */
@media (min-width: 1024px) {
  .component { /* desktop styles */ }
}
```

### Component Responsiveness
- **Header**: Transforms from mobile banner + menu to desktop horizontal nav
- **BulletinList**: Single column mobile → multi-column desktop grid
- **Navigation**: Collapsible mobile menu → persistent desktop menu
- **Forms**: Full-width mobile → centered desktop with max-width

## Performance Considerations

### Code Splitting
```typescript
// Lazy load pages for better initial bundle size
const AmenitiesPage = lazy(() => import('./pages/AmenitiesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
```

### Image Optimization
```typescript
// Responsive images with lazy loading
<img
  src={welcomeImage}
  alt="Welcome"
  className="w-full h-auto"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Bundle Optimization
- **Tree shaking**: Import only used components from libraries
- **Dynamic imports**: Load auth components only when needed  
- **Chunk splitting**: Separate vendor bundles from application code
- **Asset optimization**: WebP images with fallbacks, compressed assets

## Testing Strategy

### Component Testing
- **Unit tests**: Individual component behavior and props
- **Integration tests**: Component interaction with hooks and context
- **Accessibility tests**: Screen reader compatibility and keyboard navigation

### Mock Strategy
- **Apollo MockProvider**: Mock GraphQL responses for component tests
- **Auth mocking**: Mock Cognito authentication state for protected routes
- **Responsive testing**: Test components at different viewport sizes
