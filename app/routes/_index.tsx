import { ActionFunction, LoaderFunction, MetaFunction, json, redirect } from "@remix-run/node";
import { loginCheckApi } from "../api/api";
import pkg from "crypto-js";
import { Form, useActionData } from "@remix-run/react";
import { channelNoCookie, getSession } from "../utils/cookies";
import { useEffect } from "react";
const { SHA256 } = pkg;

export const meta: MetaFunction = ({ error }) => {
  return [{ title: error ? "oops!" : "로그인 | 쿼카" }];
};

interface ActionData {
  errorMessage?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = SHA256(formData.get("password") as string).toString();
  formData.append("email", email);
  formData.append("password", password);
  const result = await loginCheckApi(formData);

  if (result.login) {
    //쿠키 세팅
    const cookie = await channelNoCookie("Qk_channel", result.channelNo, result);
    return redirect("/dashboard", { headers: { "Set-Cookie": cookie } });
  } else {
    return json({ errorMessage: result.message }, { status: 400 });
  }
};

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const channelNo = session.get("Qk_channel");

  if (channelNo) return redirect("/dashboard");

  return [];
};

export default function Login() {
  const actionData = useActionData<ActionData>();

  useEffect(() => {
    if (actionData?.errorMessage) {
      alert(actionData.errorMessage);
    }
  }, [actionData]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">QUOKKA</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  비밀번호
                </label>
                {/* <div className="text-sm">
                    <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </Form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p> */}
        </div>
      </div>
    </>
  );
}
