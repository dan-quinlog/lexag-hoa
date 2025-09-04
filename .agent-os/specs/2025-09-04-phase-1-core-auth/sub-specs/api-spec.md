# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-09-04-phase-1-core-auth/spec.md

## GraphQL Schema

### Types

```graphql
type User {
  id: ID!
  cognitoUserId: String!
  email: String!
  firstName: String
  lastName: String
  phone: String
  userType: UserType!
  role: BoardRole
  isActive: Boolean!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Bulletin {
  id: ID!
  title: String!
  content: String!
  author: User
  audience: AudienceType!
  subjectTags: [String!]
  isPublished: Boolean!
  publishedAt: AWSDateTime
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

enum UserType {
  RESIDENT
  OWNER
  BOARD
}

enum BoardRole {
  PRESIDENT
  SECRETARY
  TREASURER
  MEDIA
  MEMBER
}

enum AudienceType {
  PUBLIC
  RESIDENTS
  OWNERS
  BOARD
}

type BulletinConnection {
  items: [Bulletin!]!
  nextToken: String
}
```

## Queries

### GET /graphql - listPublicBulletins

**Purpose:** Retrieve paginated list of public bulletins for unauthenticated users
**Authentication:** None required
**Parameters:** 
- `limit: Int` (optional, default: 20, max: 50)
- `nextToken: String` (optional, for pagination)

```graphql
query ListPublicBulletins($limit: Int, $nextToken: String) {
  listPublicBulletins(limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      content
      author {
        firstName
        lastName
      }
      subjectTags
      publishedAt
      createdAt
    }
    nextToken
  }
}
```

**Response:** BulletinConnection with public bulletins only
**Errors:** None (public endpoint)

### GET /graphql - listBulletinsForUser

**Purpose:** Retrieve paginated bulletins based on user's audience access level
**Authentication:** Required (AWS Cognito JWT)
**Parameters:**
- `limit: Int` (optional, default: 20, max: 50) 
- `nextToken: String` (optional, for pagination)
- `subjectTags: [String!]` (optional, filter by tags)

```graphql
query ListBulletinsForUser($limit: Int, $nextToken: String, $subjectTags: [String!]) {
  listBulletinsForUser(limit: $limit, nextToken: $nextToken, subjectTags: $subjectTags) {
    items {
      id
      title
      content
      author {
        firstName
        lastName
      }
      audience
      subjectTags
      publishedAt
      createdAt
    }
    nextToken
  }
}
```

**Response:** BulletinConnection filtered by user's access level
**Errors:** 
- `UNAUTHORIZED` - Invalid or missing JWT token
- `FORBIDDEN` - Token valid but user lacks permissions

### GET /graphql - getCurrentUser

**Purpose:** Get current authenticated user profile information
**Authentication:** Required (AWS Cognito JWT)
**Parameters:** None

```graphql
query GetCurrentUser {
  getCurrentUser {
    id
    email
    firstName
    lastName
    userType
    role
    isActive
    createdAt
  }
}
```

**Response:** User object for authenticated user
**Errors:**
- `UNAUTHORIZED` - Invalid or missing JWT token
- `USER_NOT_FOUND` - JWT valid but user not found in database

## Mutations

### POST /graphql - createUser

**Purpose:** Create user profile after Cognito registration
**Authentication:** Required (AWS Cognito JWT - self-registration only)
**Parameters:**
- `input: CreateUserInput!`

```graphql
input CreateUserInput {
  firstName: String!
  lastName: String!
  phone: String
  userType: UserType!
}

mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    firstName
    lastName
    userType
    createdAt
  }
}
```

**Response:** Created User object
**Errors:**
- `UNAUTHORIZED` - Invalid JWT token
- `VALIDATION_ERROR` - Invalid input data
- `USER_ALREADY_EXISTS` - User profile already exists for this Cognito ID

## Resolvers & Business Logic

### Authentication Flow
1. **User Registration**: Cognito handles email verification, createUser mutation stores profile
2. **Login**: Cognito returns JWT, frontend stores token for API authentication  
3. **Protected Queries**: Verify JWT signature and extract user claims for authorization

### Bulletin Access Control
- **Public**: Anyone can access bulletins with audience='PUBLIC'
- **Residents**: Authenticated users with userType='RESIDENT' or 'OWNER' can access 'RESIDENTS' + 'PUBLIC'
- **Owners**: Authenticated users with userType='OWNER' can access 'OWNERS' + 'RESIDENTS' + 'PUBLIC'  
- **Board**: Authenticated users with userType='BOARD' can access all audiences

### Pagination Implementation
- **Cursor-based**: Use createdAt timestamp as cursor for consistent ordering
- **Performance**: Limit maximum page size to prevent resource exhaustion
- **Infinite Scroll**: nextToken enables seamless frontend pagination

## Integration Points

### AWS Cognito
- **JWT Validation**: AppSync validates Cognito JWT tokens automatically
- **User Claims**: Extract cognito:username and email from JWT for user identification
- **Group Membership**: Future enhancement will use Cognito groups for role-based access

### Frontend Apollo Client
- **Caching**: Apollo cache normalized by ID for efficient updates
- **Optimistic UI**: Mutations include optimistic response for better UX
- **Error Handling**: Standardized error responses for consistent frontend handling
