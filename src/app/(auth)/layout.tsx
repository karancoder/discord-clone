import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}

export default AuthLayout;
