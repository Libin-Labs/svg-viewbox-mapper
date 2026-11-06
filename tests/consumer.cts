import * as api from '@lp-labs/svg-viewbox-mapper';
import { mapViewBox } from '@lp-labs/svg-viewbox-mapper';
const matrix = mapViewBox(
  { x: 0, y: 0, width: 100, height: 100 },
  { x: 0, y: 0, width: 200, height: 100 },
);
if (matrix.scale !== 1 || matrix.offsetX !== 50) throw new Error('Unexpected meet alignment');
// @ts-expect-error invalid argument must be rejected by declarations
api.mapViewBox({ x: '0', y: 0, width: 1, height: 1 }, { x: 0, y: 0, width: 1, height: 1 });
