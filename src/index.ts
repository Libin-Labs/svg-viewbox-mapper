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
export function mapViewBox(
  viewBox: Rect,
  viewport: Rect,
  mode: 'meet' | 'slice' | 'none' = 'meet',
  alignX: 'min' | 'mid' | 'max' = 'mid',
  alignY: 'min' | 'mid' | 'max' = 'mid',
): Mapping {
  for (const r of [viewBox, viewport])
    for (const v of [r.x, r.y, r.width, r.height])
      if (typeof v !== 'number' || !Number.isFinite(v))
        throw new TypeError('Rectangle values must be finite');
  if (viewBox.width <= 0 || viewBox.height <= 0 || viewport.width <= 0 || viewport.height <= 0)
    throw new RangeError('Rectangle dimensions must be positive');
  if (!['min', 'mid', 'max'].includes(alignX) || !['min', 'mid', 'max'].includes(alignY))
    throw new TypeError('Unknown alignment');
  const sx = viewport.width / viewBox.width,
    sy = viewport.height / viewBox.height;
  if (mode === 'none')
    return {
      scaleX: sx,
      scaleY: sy,
      offsetX: viewport.x - viewBox.x * sx,
      offsetY: viewport.y - viewBox.y * sy,
      scale: null,
    };
  if (mode !== 'meet' && mode !== 'slice') throw new TypeError('Unknown aspect mode');
  const s = mode === 'meet' ? Math.min(sx, sy) : Math.max(sx, sy),
    factor = (a: 'min' | 'mid' | 'max') => (a === 'min' ? 0 : a === 'mid' ? 0.5 : 1);
  return {
    scaleX: s,
    scaleY: s,
    offsetX: viewport.x + (viewport.width - viewBox.width * s) * factor(alignX) - viewBox.x * s,
    offsetY: viewport.y + (viewport.height - viewBox.height * s) * factor(alignY) - viewBox.y * s,
    scale: s,
  };
}
