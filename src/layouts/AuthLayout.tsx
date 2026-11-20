import AuthHero from "@/features/auth/components/AuthHero";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className=" min-h-screen grid lg:grid-cols-2">

        <AuthHero />
        {/* px-6 py-10: مسافة حوالين الفورم عشان ميلزقش في حرف شاشة الموبايل */}
        <div className="flex items-center justify-center px-6 py-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
