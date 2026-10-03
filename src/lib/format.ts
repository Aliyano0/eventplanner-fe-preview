/**
 * Locale-pinned number formatting.
 *
 * `Number#toLocaleString()` without a locale uses the runtime default, which differs
 * between the Node server and the visitor's browser and causes hydration mismatches.
 * Pinning the locale keeps server-rendered and client-rendered text identical.
 */
export const formatNumber = (value: number) => value.toLocaleString("en-US");
