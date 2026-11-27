import { expect, it } from "vitest";
import nextConfig from "../../next.config";

it("routes same-origin API requests to the configured NestJS origin", async () => {
  expect(await nextConfig.rewrites?.()).toEqual([
    {
      source: "/api/:path*",
      destination: `${(process.env.API_ORIGIN ?? "http://localhost:4000").replace(/\/$/, "")}/api/:path*`,
    },
  ]);
});
