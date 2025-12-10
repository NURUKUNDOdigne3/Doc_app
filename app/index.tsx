import { Href, Redirect } from "expo-router";

const loginRoute = "/login" as const;

export default function Index() {
  return <Redirect href={loginRoute as Href} />;
}
