export const EnvConfiguration = (): Record<string, unknown> => ({
  environment: process.env.NODE_ENV || 'dev',

  port: process.env.PORT || 3000,
  hostApi: process.env.HOST_API || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL,

  dbType: process.env.DB_TYPE,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUsername: process.env.DB_USERNAME,

  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 10,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
});
