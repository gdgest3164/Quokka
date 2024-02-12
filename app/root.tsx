import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/node";
import clsx from "clsx";

import { NonFlashOfWrongThemeEls, Theme, ThemeProvider, useTheme } from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";

import styles from "./tailwind.css";
import Sidebar, { SidebarProps } from "./Components/Layouts/sidebar";
import { getSession } from "./utils/cookies";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export type LoaderData = {
  theme: Theme | null;
  brand?: SidebarProps;
  channelNo?: string;
  cookie?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  //다크모드
  const themeSession = await getThemeSession(request);

  const session = await getSession(request.headers.get("Cookie"));
  const channel_data = session.get("Qk_channel");
  let data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  if (channel_data !== void 0) {
    //셀러 브랜드 정보

    data = {
      ...data,
      brand: channel_data.data,
    };

    return json({ data });
  }

  return json({ data });
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

function Login() {
  //@ts-expect-error description: 쿠키와 같이 보내기 data를 감싸서 보내기 때문에, data는 무시하기로 함
  const { data } = useLoaderData<LoaderData>();
  const [theme] = useTheme();

  return (
    <html lang="kr" className={clsx(theme)} suppressHydrationWarning={true}>
      <Head {...data} />
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function App() {
  //@ts-expect-error description: 쿠키와 같이 보내기 data를 감싸서 보내기 때문에, data는 무시하기로 함
  const { data } = useLoaderData<LoaderData>();
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
  //@ts-expect-error description: 쿠키와 같이 보내기 data를 감싸서 보내기 때문에, data는 무시하기로 함
  const { data } = useLoaderData<LoaderData>();
  const location = useLocation();

  return <ThemeProvider specifiedTheme={data.theme}>{location.pathname === "/" ? <Login /> : <App />}</ThemeProvider>;
}
