import { gql } from '@apollo/client';

// Query to get public bulletins for the bulletin board
export const LIST_PUBLIC_BULLETINS = gql`
  query ListPublicBulletins($limit: Int, $nextToken: String) {
    listPublicBulletins(limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        publishedAt
        author {
          firstName
          lastName
        }
      }
      nextToken
    }
  }
`;

// Query to get bulletins for authenticated users
export const LIST_BULLETINS_FOR_USER = gql`
  query ListBulletinsForUser($limit: Int, $nextToken: String, $subjectTags: [String!]) {
    listBulletinsForUser(limit: $limit, nextToken: $nextToken, subjectTags: $subjectTags) {
      items {
        id
        title
        content
        audience
        publishedAt
        author {
          firstName
          lastName
        }
      }
      nextToken
    }
  }
`;

// Query to get current user info
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      email
      role
      userType
      isActive
    }
  }
`;
