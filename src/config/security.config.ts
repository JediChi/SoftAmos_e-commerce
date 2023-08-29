import { registerAs } from '@nestjs/config';

const { JWT_TOKEN } = process.env;

export const get_jwt_secret = () => JWT_TOKEN;
export const get_security_config_name = () => 'security';

export const get_security_config = () => ({
  jwt_secret: get_jwt_secret(),
  expires_in: '60m',
});

export default registerAs(get_security_config_name(), get_security_config);
