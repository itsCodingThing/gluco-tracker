/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FIREBASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
