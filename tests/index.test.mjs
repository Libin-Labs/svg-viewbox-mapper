import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('meet centers letterboxed content', () => {
  assert.deepEqual(
    api.mapViewBox(
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 0, y: 0, width: 200, height: 100 },
    ),
    { scaleX: 1, scaleY: 1, offsetX: 50, offsetY: 0, scale: 1 },
  );
});
test('slice uses larger scale', () => {
  assert.equal(
    api.mapViewBox(
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 0, y: 0, width: 200, height: 100 },
      'slice',
    ).scale,
    2,
  );
});
test('none scales axes independently', () => {
  const m = api.mapViewBox(
    { x: 0, y: 0, width: 100, height: 50 },
    { x: 0, y: 0, width: 200, height: 100 },
    'none',
  );
  assert.equal(m.scaleX, 2);
  assert.equal(m.scaleY, 2);
});
test('respects minimum alignment', () => {
  assert.equal(
    api.mapViewBox(
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 0, y: 0, width: 200, height: 100 },
      'meet',
      'min',
    ).offsetX,
    0,
  );
});
test('accounts for viewBox origin', () => {
  assert.equal(
    api.mapViewBox(
      { x: 10, y: 20, width: 100, height: 100 },
      { x: 0, y: 0, width: 100, height: 100 },
    ).offsetX,
    -10,
  );
});
test('rejects zero dimensions', () => {
  assert.throws(
    () => api.mapViewBox({ x: 0, y: 0, width: 0, height: 1 }, { x: 0, y: 0, width: 1, height: 1 }),
    RangeError,
  );
});
