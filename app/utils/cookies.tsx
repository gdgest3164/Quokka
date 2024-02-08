import { createCookieSessionStorage } from "@remix-run/node";

// getSession : cookie string에서 세션을 회수.
// commitSession: 새로운 cookie string 생성.
// destroySession: session data를 삭제하고 cookie string을 반환.
export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "Qk_channel",
  },
});
