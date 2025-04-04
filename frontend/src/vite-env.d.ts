/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_FRONTEND_BASE_API_URL: string;
    VITE_BACKEND_BASE_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }  