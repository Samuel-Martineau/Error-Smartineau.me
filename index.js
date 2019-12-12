const httpCodes = require('http').STATUS_CODES;
const minify = require('html-minifier').minify;
const path = require('path');
const fs = require('fs');

const template = fs.readFileSync(path.join(__dirname, 'template.html'), {
  encoding: 'utf-8'
});
const outDir = path.join(__dirname, 'public');

try {
  fs.mkdirSync(outDir);
} catch {}

for (let httpCode in httpCodes) {
  if (httpCode < 400) continue;
  console.log(`error_page ${httpCode} /${httpCode}.html;`);
  fs.writeFileSync(
    path.join(outDir, httpCode + '.html'),
    minify(
      template
        .replace(/ERROR_CODE/g, httpCode)
        .replace(/ERROR_MESSAGE/g, httpCodes[httpCode]),
      {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        html5: true,
        minifyCSS: true
      }
    )
  );
}
