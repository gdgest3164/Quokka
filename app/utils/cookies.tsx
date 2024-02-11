import { createCookieSessionStorage } from "@remix-run/node";

// getSession : cookie string에서 세션을 회수.
// commitSession: 새로운 cookie string 생성.
// destroySession: session data를 삭제하고 cookie string을 반환.
export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "Qk_channel",
  },
});

interface channelNoCookieProp {
  login: boolean;
  message: string;
  data: {
    channelNo: number;
    channelType: string;
    name: string;
    url: string;
    representativeImageUrl: string;
    id: string;
  };
}
//쿠키 생성
export const channelNoCookie = async (name: string, code: string, datas: channelNoCookieProp) => {
  const session = await getSession(code);
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2); // 이틀 후 만료
  session.set(name, datas);
  const create_cookie = await commitSession(session, { sameSite: "none", expires, httpOnly: false, secure: process.env.NODE_ENV === "production" });
  return create_cookie;
};
