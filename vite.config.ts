import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    restoreMocks: true,
  },
};

export default defineConfig({
  plugins: [checker({ typescript: true })],
  test: vitestConfig.test,
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }
});
