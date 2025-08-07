const test = require('node:test');
const assert = require('assert');
const { Blob } = require('buffer');
const { buildPath, archivePage } = require('../background.js');

global.URL.createObjectURL = () => 'blob:test';
global.URL.revokeObjectURL = () => {};
global.Blob = Blob;

test('buildPath constructs expected archive path', () => {
  const ts = Date.UTC(2023, 0, 2, 3, 4, 5);
  const result = buildPath('Your Archive', 'https://example.com/page', ts);
  assert.strictEqual(result, 'Your Archive/example.com/2023-01-02/030405.html');
});

test('archivePage uses downloads API when enabled', async () => {
  const calls = [];
  const api = { downloads: { download: async (opts) => { calls.push(opts); } } };
  const data = { url: 'https://example.com', html: '<html></html>', ts: 0 };
  await archivePage(api, data, { enabled: true, folder: 'Your Archive' });
  assert.strictEqual(calls.length, 1);
  assert.strictEqual(calls[0].filename, 'Your Archive/example.com/1970-01-01/000000.html');
});

test('archivePage skips when disabled', async () => {
  const calls = [];
  const api = { downloads: { download: async (opts) => { calls.push(opts); } } };
  const data = { url: 'https://example.com', html: '<html></html>', ts: 0 };
  await archivePage(api, data, { enabled: false, folder: 'Your Archive' });
  assert.strictEqual(calls.length, 0);
});
