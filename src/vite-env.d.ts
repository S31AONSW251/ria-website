/// <reference types="vite/client" />

declare module '*.css'

interface ImportMetaEnv {
  readonly VITE_SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT?: string
  readonly VITE_SOFTWARE_EXCHANGE_REVIEW_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
