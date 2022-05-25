import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:admin@localhost:5432/my_database',
    idleTimeoutMillis: 30000
});