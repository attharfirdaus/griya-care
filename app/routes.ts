import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),

  layout("routes/(dashboard)/_layout.tsx", [
    route("pelanggan", "routes/(dashboard)/pelanggan.tsx"),
  ]),
] satisfies RouteConfig;

