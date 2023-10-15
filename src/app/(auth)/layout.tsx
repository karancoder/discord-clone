import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="bg-red-200 h-full">{children}</div>;
}

export default AuthLayout;
