import "server-only";

export interface IpGeo {
  country: string | null;
  region: string | null;
  city: string | null;
}

const PRIVATE_IP_PREFIXES = ["10.", "192.168.", "127.", "::1"];

function isPrivateIp(ip: string): boolean {
  return PRIVATE_IP_PREFIXES.some((prefix) => ip.startsWith(prefix));
}

// Best-effort IP -> country/region/city lookup via a free API. Never throws —
// analytics failures should never affect the actual page request.
export async function lookupIpGeo(ip: string): Promise<IpGeo> {
  if (!ip || ip === "unknown" || isPrivateIp(ip)) {
    return { country: null, region: null, city: null };
  }

  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,regionName,city`,
      { signal: AbortSignal.timeout(3000) }
    );
    const data = await res.json();
    if (data.status !== "success") return { country: null, region: null, city: null };
    return {
      country: data.country ?? null,
      region: data.regionName ?? null,
      city: data.city ?? null,
    };
  } catch {
    return { country: null, region: null, city: null };
  }
}
