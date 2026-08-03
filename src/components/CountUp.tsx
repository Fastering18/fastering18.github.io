"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

function formatValue(value: number, suffix: string, compact: boolean) {
    if (compact && value >= 1000) {
        const k = value / 1000;
        const rounded = Number.isInteger(k) ? String(k) : k.toFixed(k >= 10 ? 0 : 1);
        return `${rounded}K${suffix}`;
    }
    return `${Math.round(value)}${suffix}`;
}

export default function CountUp({
    end,
    duration = 1600,
    suffix = "",
    compact = false,
    className = "",
}: {
    end: number;
    duration?: number;
    suffix?: string;
    compact?: boolean;
    className?: string;
}) {
    const [display, setDisplay] = useState(() => formatValue(0, suffix, compact));
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setDisplay(formatValue(end, suffix, compact));
            return;
        }

        let raf = 0;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;
                started.current = true;
                observer.disconnect();

                const start = performance.now();
                const tick = (now: number) => {
                    const t = Math.min(1, (now - start) / duration);
                    setDisplay(formatValue(end * easeOutCubic(t), suffix, compact));
                    if (t < 1) {
                        raf = requestAnimationFrame(tick);
                    } else {
                        setDisplay(formatValue(end, suffix, compact));
                    }
                };
                raf = requestAnimationFrame(tick);
            },
            { threshold: 0.4, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [end, duration, suffix, compact]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
}
