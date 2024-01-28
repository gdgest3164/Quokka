import { createCookieSessionStorage } from "@remix-run/node";

// export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
//   cookie: {
//     name: "brand_info",
//     secure: true,
//     // secrets: [getRequiredServerEnvVar("SESSION_SECRET")],
//     sameSite: "lax",
//     // path: "/",
//     expires: new Date("2088-10-18"),
//     httpOnly: true,
//   },
// });

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "brand_info",
  },
});
