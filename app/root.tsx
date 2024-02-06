import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import clsx from "clsx";

import { NonFlashOfWrongThemeEls, Theme, ThemeProvider, useTheme } from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";

import styles from "./tailwind.css";
import Sidebar, { SidebarProps } from "./Components/Layouts/sidebar";
import { apiSellerBrand } from "./api/api";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export type LoaderData = {
  theme: Theme | null;
  brand: SidebarProps;
};

export const loader: LoaderFunction = async ({ request }) => {
  //다크모드
  const themeSession = await getThemeSession(request);

  //셀러 브랜드 정보
  const responseData = await apiSellerBrand("100987434");

  const data: LoaderData = {
    theme: themeSession.getTheme(),
    brand: responseData,
  };
  return data;
};

export function Head(data: LoaderData) {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
      <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
    </head>
  );
}

function App() {
  const data = useLoaderData<LoaderData>();
  const [theme] = useTheme();

  return (
    <html lang="kr" className={clsx(theme)} suppressHydrationWarning={true}>
      <Head {...data} />
      <body>
        <Sidebar {...data.brand} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
