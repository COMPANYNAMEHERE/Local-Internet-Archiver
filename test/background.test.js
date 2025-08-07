const test = require('node:test');
const assert = require('assert');
const fs = require('fs').promises;
const path = require('path');
const { buildPath, archivePage } = require('../background.js');

test('buildPath constructs expected archive path', () => {
  const ts = Date.UTC(2023, 0, 2, 3, 4, 5);
  const result = buildPath('Your Archive', 'https://example.com/page', ts);
  assert.strictEqual(result, 'Your Archive/example.com/2023-01-02/030405.html');
});

test('archivePage writes to extension directory when enabled', async () => {
  const data = { url: 'https://example.com', html: '<html></html>', ts: 0 };
  const folder = 'Your Archive';
  const expected = path.join(__dirname, '..', buildPath(folder, data.url, data.ts));
  const saved = await archivePage(data, { enabled: true, folder });
  assert.strictEqual(saved, expected);
  const contents = await fs.readFile(saved, 'utf8');
  assert.strictEqual(contents, data.html);
  await fs.rm(path.join(__dirname, '..', folder), { recursive: true, force: true });
});

test('archivePage skips when disabled', async () => {
  const data = { url: 'https://example.com', html: '<html></html>', ts: 0 };
  const folder = 'skip-folder';
  await archivePage(data, { enabled: false, folder });
  const file = path.join(__dirname, '..', buildPath(folder, data.url, data.ts));
  let exists = true;
  try {
    await fs.access(file);
  } catch {
    exists = false;
  }
  assert.strictEqual(exists, false);
});
