import { Express, Router } from "express";

export interface RouteInfo {
  path: string;
  method: string;
  middleware: string[];
}

function getRouteInfo(layer: any, currentPath: string = ""): RouteInfo[] {
  if (layer.route) {
    // A route object
    const path = currentPath + layer.route.path;
    return layer.route.stack.map((routeLayer: any) => ({
      path: path,
      method: routeLayer.method ? routeLayer.method.toUpperCase() : "*",
      middleware: [
        routeLayer.handle.name || "(anonymous)",
      ],
    }));
  } else if (layer.name === "router" && layer.handle.stack) {
    // A router middleware
    const routerPath = layer.regexp?.source.replace(/\\/g, "").replace(/\(\?:\/\(\.\*\)\)/, "") || "/";
    const newBasePath = currentPath + (routerPath === "/" ? "" : routerPath);
    return layer.handle.stack.flatMap((routerLayer: any) =>
      getRouteInfo(routerLayer, newBasePath)
    );
  } else {
    // Other middleware (e.g., global middleware, error handlers)
    return [];
  }
}

export function listRoutes(
  app: Express | Router,
  basePath: string = ""
): RouteInfo[] {
  const stack = (app as Express)._router?.stack || (app as Router).stack;
  if (!stack) {
    return [];
  }

  return stack.flatMap((layer: any) => getRouteInfo(layer, basePath));
}