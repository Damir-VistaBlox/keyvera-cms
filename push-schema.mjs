// Schema push script
process.env.DATABASE_URL = "postgresql://neondb_owner:npg_XDIYbhg4LTN1@ep-dry-mouse-agwhrsh3-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
process.env.PAYLOAD_SECRET = 'push-secret'

const { getPayload } = await import('payload');
const { pushDevSchema } = await import('@payloadcms/drizzle');
const cfg = await import('./payload.config.ts');
const p = await getPayload({ config: cfg.default });
console.log('Pushing...');
await pushDevSchema(p.db);
console.log('✓ Done');
process.exit(0);
