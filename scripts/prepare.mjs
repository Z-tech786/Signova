// Ensures vite/esbuild binaries are executable (needed when npm blocked
// install scripts on Vercel). Safe no-op on Windows/dev machines.
import fs from 'node:fs'
import path from 'node:path'

const targets = [
  'node_modules/vite/bin/vite.js',
  'node_modules/esbuild/bin/esbuild',
]
try {
  for (const dir of fs.readdirSync('node_modules/@esbuild')) {
    targets.push(path.join('node_modules/@esbuild', dir, 'bin', 'esbuild'))
  }
} catch {}
try {
  for (const f of fs.readdirSync('node_modules/.bin')) {
    targets.push(path.join('node_modules/.bin', f))
  }
} catch {}

for (const t of targets) {
  try { fs.chmodSync(t, 0o755) } catch {}
}
