"use client";
import * as React from "react";

type Props = React.PropsWithChildren<{
  minScale?: number;
  maxScale?: number;
  rotate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}>;

export default function XrManipulable({
  children,
  minScale = 0.9,
  maxScale = 1.25,
  rotate = true,
  className,
  style,
}: Props) {
  const elRef = React.useRef<HTMLDivElement>(null);
  const pointers = React.useRef(new Map<number, { x: number; y: number }>());
  const base = React.useRef({
    x: 0, y: 0, scale: 1, rot: 0,
    // gesture baselines
    dist: 1, ang: 0,
    // inertia
    vx: 0, vy: 0,
    lastT: 0, lastX: 0, lastY: 0,
    raf: 0 as number | 0,
  });

  const apply = () => {
    const n = base.current;
    if (!elRef.current) return;
    elRef.current.style.transform =
      `translate3d(${n.x}px, ${n.y}px, 0) rotate(${n.rot}deg) scale(${n.scale})`;
  };

  const setFromPointers = () => {
    const pts = Array.from(pointers.current.values());
    const n = base.current;
    if (pts.length === 1) {
      const p = pts[0];
      // drag
      const dx = p.x - n.lastX;
      const dy = p.y - n.lastY;
      n.vx = dx;
      n.vy = dy;
      n.x += dx;
      n.y += dy;
      n.lastX = p.x;
      n.lastY = p.y;
      apply();
    } else if (pts.length >= 2) {
      // pinch + rotate
      const [a, b] = pts;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;

      const scale = (dist / base.current.dist) * base.current.scale;
      base.current.scale = Math.max(minScale, Math.min(maxScale, scale));

      if (rotate) {
        const deltaAng = ang - base.current.ang;
        base.current.rot += deltaAng;
        base.current.ang = ang;
      }
      base.current.dist = dist;
      apply();
    }
  };

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const n = base.current;
    if (pointers.current.size === 1) {
      const p = Array.from(pointers.current.values())[0];
      n.lastX = p.x; n.lastY = p.y;
    } else if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      n.dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      n.ang = Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI;
    }
    cancelAnimationFrame(base.current.raf || 0);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!(e.currentTarget as Element).hasPointerCapture(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setFromPointers();
  };

  const onUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);

    // inertia if single-pointer drag
    if (pointers.current.size === 0) {
      const n = base.current;
      let vx = n.vx, vy = n.vy;
      const friction = 0.92;
      const tick = () => {
        vx *= friction; vy *= friction;
        n.x += vx; n.y += vy;
        if (Math.hypot(vx, vy) < 0.4) return;
        apply();
        n.raf = requestAnimationFrame(tick);
      };
      n.raf = requestAnimationFrame(tick);
    } else if (pointers.current.size === 1) {
      // reset gesture baselines for remaining finger
      const p = Array.from(pointers.current.values())[0];
      base.current.lastX = p.x; base.current.lastY = p.y;
    }
  };

  return (
    <div
      ref={elRef}
      className={className}
      style={{
        transform: "translate3d(0,0,0) scale(1)",
        willChange: "transform",
        touchAction: "none",
        ...style,
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {children}
    </div>
  );
}
