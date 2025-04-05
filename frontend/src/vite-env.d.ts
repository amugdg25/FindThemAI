/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_BACKEND_BASE_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }  