import AuthHero from "@/features/auth/components/AuthHero";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className=" min-h-screen grid lg:grid-cols-2">

        <AuthHero />
        <div className="flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}
