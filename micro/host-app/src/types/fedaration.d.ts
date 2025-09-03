// src/types/federation.d.ts

// declare module "@originjs/vite-plugin-federation" {
//   import { Plugin } from "vite";
//   interface FederationOptions {
//     name: string;
//     filename?: string;
//     exposes?: Record<string, string>;
//     remotes?: Record<string, string>;
//     shared?: string[] | Record<string, { singleton?: boolean; requiredVersion?: string }>;
//   }
//   function federation(options: FederationOptions): Plugin;
//   export default federation;
// }

// --- Add remote modules here ---
// src/types/federation.d.ts

declare module "students/StudentsModule" {
  import { ComponentType } from "react";
  const StudentsApp: ComponentType;
  export default StudentsApp;
}

declare module "teachers/TeachersModule" {
  import { ComponentType } from "react";
  const TeachersApp: ComponentType;
  export default TeachersApp;
}

