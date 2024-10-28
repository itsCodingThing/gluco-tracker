/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
