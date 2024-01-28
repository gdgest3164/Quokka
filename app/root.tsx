import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import clsx from "clsx";

import { NonFlashOfWrongThemeEls, Theme, ThemeProvider, useTheme } from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";

import styles from "./tailwind.css";
import Sidebar, { SidebarProps } from "./Components/Layouts/sidebar";

export const meta: MetaFunction = () => {
  const title = "쿼카 재고관리";
  const description = "쿼카 재고 관리 자동화";

  return [
    {
      "og:title": title,
      "og:description": description,
    },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export type LoaderData = {
  theme: Theme | null;
  brand: SidebarProps;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const response = await fetch(`http://quokka.run:8000/api/seller/brand?channelNo=${"100987434"}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  const data: LoaderData = {
    theme: themeSession.getTheme(),
    brand: responseData,
  };

  return data;
};

function App() {
  const data = useLoaderData<LoaderData>();

  const [theme] = useTheme();

  return (
    <html lang="kr" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
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
