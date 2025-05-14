import { exec } from 'child_process'

exec('pnpm changeset version')
exec('pnpm install')
