# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-09-04-phase-1-core-auth/spec.md

## Schema Changes

### New Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cognito_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('resident', 'owner', 'board')),
    role VARCHAR(20) CHECK (role IN ('president', 'secretary', 'treasurer', 'media', 'member')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_cognito_id ON users(cognito_user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
```

#### bulletins
```sql
CREATE TABLE bulletins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    audience VARCHAR(20) NOT NULL CHECK (audience IN ('public', 'residents', 'owners', 'board')),
    subject_tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bulletins_audience ON bulletins(audience);
CREATE INDEX idx_bulletins_published ON bulletins(is_published, published_at DESC);
CREATE INDEX idx_bulletins_tags ON bulletins USING GIN(subject_tags);
CREATE INDEX idx_bulletins_created ON bulletins(created_at DESC);
```

### Indexes and Constraints

- **Foreign Key Constraints**: bulletins.author_id references users.id with SET NULL on delete
- **Check Constraints**: Enforce valid values for user_type, role, and audience fields
- **GIN Index**: Enable efficient searching on subject_tags array
- **Composite Indexes**: Optimize bulletin queries by publication status and date

## Data Integrity Rules

### User Management
- **Unique Constraints**: cognito_user_id and email must be unique across all users
- **Cascade Behavior**: When user is deleted, their bulletins remain but author_id becomes null
- **Role Validation**: Board members must have user_type='board' and valid role assignment

### Bulletin Publishing
- **Publication Logic**: is_published=true requires published_at timestamp
- **Audience Hierarchy**: 'public' < 'residents' < 'owners' < 'board' for access control
- **Content Security**: Rich text content will be sanitized at application layer

### Performance Considerations
- **Pagination Strategy**: Use cursor-based pagination with created_at for infinite scroll
- **Query Optimization**: Compound indexes support filtering by audience + publication status
- **Tag Search**: GIN index enables efficient array searching for subject tag filtering

## Migration Strategy

1. **Create users table** with Cognito integration fields
2. **Create bulletins table** with audience-based access control
3. **Add indexes** for query performance optimization
4. **Seed initial data** with sample public bulletins for testing

## Rationale

- **UUID Primary Keys**: Enable distributed system compatibility and avoid enumeration attacks
- **Timestamp with Time Zone**: Ensure consistent time handling across different regions
- **Array Type for Tags**: PostgreSQL native array support for flexible tag management
- **Enum-like Constraints**: Check constraints ensure data consistency for finite value sets
