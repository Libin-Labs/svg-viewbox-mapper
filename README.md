# @lp-labs/svg-viewbox-mapper

Maps SVG viewBox coordinates into viewport coordinates with meet, slice and alignment rules.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/svg-viewbox-mapper
```

## Working example

```js
import { mapViewBox } from '@lp-labs/svg-viewbox-mapper';
const matrix = mapViewBox(
  { x: 0, y: 0, width: 100, height: 100 },
  { x: 0, y: 0, width: 200, height: 100 },
);
if (matrix.scale !== 1 || matrix.offsetX !== 50) throw new Error('Unexpected meet alignment');
```

CommonJS: `const api = require('@lp-labs/svg-viewbox-mapper')`.

## Behavior, customization and limits

Calculates the six-value affine transform for positive finite viewBox and viewport rectangles. Supports none/meet/slice and xMin/xMid/xMax by yMin/yMid/yMax alignment; it does not parse SVG documents or apply clipping.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface Rect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}
export interface Mapping {
  readonly scaleX: number;
  readonly scaleY: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly scale: number | null;
}
export declare function mapViewBox(
  viewBox: Rect,
  viewport: Rect,
  mode?: 'meet' | 'slice' | 'none',
  alignX?: 'min' | 'mid' | 'max',
  alignY?: 'min' | 'mid' | 'max',
): Mapping;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
