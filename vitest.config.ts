import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["json", "lcov"],
      reportsDirectory: "./__tests__/unit/coverage",
    },
    environment: "node",
    env: {
      NODE_ENV: "test",
    },
  },
  plugins: [tsconfigPaths()],
});
