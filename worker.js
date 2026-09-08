export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // www → apex, and any stray hostnames → canonical
    if (url.hostname === "www.hadavienterprises.com") {
      url.hostname = "hadavienterprises.com";
      return Response.redirect(url.toString(), 301);
    }
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    if (url.hostname.endsWith(".workers.dev")) headers.set("X-Robots-Tag", "noindex, nofollow");
    if (url.pathname.startsWith("/fonts/") || url.pathname.startsWith("/images/")) headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  }
};
