export const dynamic = "force-dynamic";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

// force next js to render this component and check
// if user is authenticated
const Layout = async (props: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user) redirect("/sign-in");

  return <div className="w-full min-h-screen">{props.children}</div>;
};

export default Layout;
