/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AWS_REGION: string
  readonly VITE_USER_POOL_ID: string
  readonly VITE_USER_POOL_CLIENT_ID: string
  readonly VITE_DATABASE_ENDPOINT: string
  readonly VITE_GRAPHQL_ENDPOINT: string
  readonly VITE_GRAPHQL_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
