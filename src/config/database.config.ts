import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.database_host,
  port: process.env.database_port || 5432,
  username: process.env.database_username,
  password: process.env.database_password,
  name: process.env.database_name,
}));
