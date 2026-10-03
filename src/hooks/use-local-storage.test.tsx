import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import { setStoredValue, useStoredValue } from "@/hooks/use-local-storage";

describe("useStoredValue", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("is null when the key is not set", () => {
    const { result } = renderHook(() => useStoredValue("ep_visited"));
    expect(result.current).toBeNull();
  });

  it("returns the stored value", () => {
    localStorage.setItem("eventplan_budget", "250000");
    const { result } = renderHook(() => useStoredValue("eventplan_budget"));
    expect(result.current).toBe("250000");
  });

  it("re-renders subscribers when a value is written in the same tab", () => {
    const { result } = renderHook(() => useStoredValue("ep_visited"));
    expect(result.current).toBeNull();

    act(() => setStoredValue("ep_visited", "true"));

    expect(result.current).toBe("true");
    expect(localStorage.getItem("ep_visited")).toBe("true");
  });

  it("renders as `undefined` on the server, without touching localStorage", () => {
    localStorage.setItem("ep_visited", "true");

    function Probe() {
      return <span>{String(useStoredValue("ep_visited"))}</span>;
    }

    // renderToString uses the server snapshot, the same value hydration starts from.
    expect(renderToString(<Probe />)).toContain("undefined");
  });
});
