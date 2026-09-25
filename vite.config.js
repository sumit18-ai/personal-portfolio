import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Middleware to force native browser download dialog with Content-Disposition: attachment
const pdfDownloadPlugin = () => ({
  name: 'pdf-download-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const rawUrl = req.url || '';
      const url = rawUrl.split('?')[0];
      const isInline = rawUrl.includes('view=1') || rawUrl.includes('inline=1');

      if (url === '/Sumit_Singh_ATS_Resume.pdf' || url === '/ats_resume.pdf' || url === '/resume.pdf' || url === '/api/download-resume') {
        const filePath = path.resolve('public/ats_resume.pdf');
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': isInline ? 'inline' : 'attachment; filename="Sumit_Singh_ATS_Resume.pdf"',
            'Content-Length': stat.size,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }

      if (url.startsWith('/certificates/') && url.endsWith('.pdf')) {
        const filePath = path.resolve('public' + url);
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          const filename = path.basename(filePath);
          res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': isInline ? 'inline' : `attachment; filename="${filename}"`,
            'Content-Length': stat.size,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }

      next();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pdfDownloadPlugin()],
});
