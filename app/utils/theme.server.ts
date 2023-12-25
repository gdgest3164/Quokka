import { createCookieSessionStorage } from "@remix-run/node";
import { getRequiredServerEnvVar } from "./misc";
import { Theme, isTheme } from "./theme-provider";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "quokka_theme",
    secure: true,
    secrets: [getRequiredServerEnvVar("SESSION_SECRET")],
    sameSite: "lax",
    path: "/",
    expires: new Date("2088-10-18"),
    httpOnly: true,
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : Theme.DARK;
    },
    setTheme: (theme: Theme) => {
      session.set("theme", theme);
      // 업데이트된 만료 날짜를 설정
      const updatedExpires = new Date();
      updatedExpires.setDate(updatedExpires.getDate() + 1); // 하루 더해주거나 필요한 만큼 설정
      session.set("expires", updatedExpires);
    },
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
