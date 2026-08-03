"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "mbp_vid";
const SESSION_KEY = "mbp_sid";
const SESSION_TTL_MS = 30 * 60 * 1000;

function uuid() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId() {
    try {
        let id = localStorage.getItem(VISITOR_KEY);
        if (!id) {
            id = uuid();
            localStorage.setItem(VISITOR_KEY, id);
        }
        return id;
    } catch {
        return uuid();
    }
}

function getSessionId() {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) {
            const parsed = JSON.parse(raw) as { id: string; t: number };
            if (parsed?.id && Date.now() - parsed.t < SESSION_TTL_MS) {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: parsed.id, t: Date.now() }));
                return parsed.id;
            }
        }
        const id = uuid();
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, t: Date.now() }));
        return id;
    } catch {
        return uuid();
    }
}

export default function VisitorTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
            return;
        }

        // Dedupe rapid re-renders of the same path within 2s
        const dedupeKey = `mbp_track_${pathname}`;
        try {
            const last = sessionStorage.getItem(dedupeKey);
            if (last && Date.now() - Number(last) < 2000) return;
            sessionStorage.setItem(dedupeKey, String(Date.now()));
        } catch {
            /* ignore */
        }

        const payload = {
            path: pathname,
            referrer: typeof document !== "undefined" ? document.referrer || null : null,
            language: typeof navigator !== "undefined" ? navigator.language : null,
            screen:
                typeof window !== "undefined"
                    ? `${window.screen.width}x${window.screen.height}`
                    : null,
            visitorId: getVisitorId(),
            sessionId: getSessionId(),
        };

        const body = JSON.stringify(payload);
        const url = "/api/analytics/track";

        // Prefer fetch+keepalive (reliable JSON parse). Beacon as unload fallback only.
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
            credentials: "same-origin",
        }).catch(() => {
            try {
                if (navigator.sendBeacon) {
                    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
                }
            } catch {
                /* silent */
            }
        });
    }, [pathname]);

    return null;
}
