declare namespace NodeJS {
  interface ProcessEnv {
    SENDGRID_API_KEY: string;
    PORT: string;
    MONGODB_URL: string;
    JWT_SECRET: string;
  }
}
