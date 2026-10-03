import { describe, expect, it } from "vitest";
import { formatNumber } from "@/lib/format";

describe("formatNumber", () => {
  it("groups thousands with commas", () => {
    expect(formatNumber(100000)).toBe("100,000");
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  it("formats small and zero values", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(950)).toBe("950");
  });

  it("is independent of the runtime default locale", () => {
    const original = Number.prototype.toLocaleString;
    // Simulate a runtime whose default locale uses '.' as the thousands separator.
    Number.prototype.toLocaleString = function (locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) {
      return original.call(this, locales ?? "de-DE", options);
    };
    try {
      expect(formatNumber(100000)).toBe("100,000");
    } finally {
      Number.prototype.toLocaleString = original;
    }
  });
});
