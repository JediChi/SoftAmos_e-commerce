import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { logger } from 'src/loggers/pino.logger';

config()

export const get_mongoose_config_name = () => 'mongoose';

export const get_mongoose_config = () => ({
    connection_url: process.env.DATABASE_URL
});

export default registerAs(get_mongoose_config_name(), get_mongoose_config);
