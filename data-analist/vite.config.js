import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteSvgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), viteSvgr()],
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      port: env.VITE_APP_PORT,
    },
  };
});
