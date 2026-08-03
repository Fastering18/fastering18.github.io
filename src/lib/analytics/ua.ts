export type ParsedUA = {
    browser: string;
    os: string;
    device: "desktop" | "mobile" | "tablet" | "bot" | "unknown";
};

export function parseUserAgent(ua: string | null | undefined): ParsedUA {
    if (!ua) {
        return { browser: "Unknown", os: "Unknown", device: "unknown" };
    }

    const lower = ua.toLowerCase();

    if (
        /bot|crawler|spider|slurp|facebookexternalhit|preview|headless|wget|curl|python-requests|scrapy/i.test(
            ua
        )
    ) {
        return { browser: "Bot", os: "Unknown", device: "bot" };
    }

    let browser = "Other";
    if (lower.includes("edg/")) browser = "Edge";
    else if (lower.includes("opr/") || lower.includes("opera")) browser = "Opera";
    else if (lower.includes("chrome/") && !lower.includes("edg/")) browser = "Chrome";
    else if (lower.includes("safari/") && !lower.includes("chrome/")) browser = "Safari";
    else if (lower.includes("firefox/")) browser = "Firefox";
    else if (lower.includes("msie") || lower.includes("trident/")) browser = "IE";

    let os = "Other";
    if (lower.includes("windows")) os = "Windows";
    else if (lower.includes("android")) os = "Android";
    else if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ios")) os = "iOS";
    else if (lower.includes("mac os") || lower.includes("macintosh")) os = "macOS";
    else if (lower.includes("linux")) os = "Linux";
    else if (lower.includes("cros")) os = "ChromeOS";

    let device: ParsedUA["device"] = "desktop";
    if (/ipad|tablet|kindle|playbook|silk/i.test(ua)) device = "tablet";
    else if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) device = "mobile";

    return { browser, os, device };
}

export function isBotUA(ua: string | null | undefined) {
    return parseUserAgent(ua).device === "bot";
}
