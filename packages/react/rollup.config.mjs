import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom"],
    onwarn: function (warning, warn) {
      // Suppress this error message... there are hundreds of them
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
      // Use default for everything else
      warn(warning);
    },
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    build: {
      chunkSizeWarningLimit: 100,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return
          }
          warn(warning)
        }
      }
    }
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ dir: "dist/", format: "esm" }],
    plugins: [dts()],
  }
];