import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { Navigate, useSearchParams } from "react-router-dom";


export default function ResetPasswordPage() {

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    if (!token) {
       return <Navigate to={"/forgot-password"} replace />
    }
    return <ResetPasswordForm token={token}/>
        
}