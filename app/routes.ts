import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),

  layout("routes/(dashboard)/_layout.tsx", [
    route("pelanggan", "routes/(dashboard)/pelanggan/index.tsx"),
    route("pelanggan/:slug", "routes/(dashboard)/pelanggan/[slug]/index.tsx")
  ]),
] satisfies RouteConfig;

