import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useProfile } from "@/features/account/hooks/useProfile";
import ProfileForm from "@/features/account/components/ProfileForm";

export default function ProfilePage() {
    // نفس الطلب اللي السايدبار بيستخدمه — نفس المفتاح ["profile"] → من الكاش، مفيش طلب تاني
    const { data: user, isLoading, isError, error } = useProfile();

    if (isError) return <ErrorAlert message={getErrorMessage(error)} />;

    // البوابة: الفورم ميتعملوش mount غير والداتا جاهزة — عشان defaultValues تتملي صح من أول رندر
    if (isLoading || !user) return <ProfileFormSkeleton />;

    return <ProfileForm user={user} />;
}

function ProfileFormSkeleton() {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="h-16 animate-pulse bg-blue-100" />
                <div className="h-16 animate-pulse bg-blue-100" />
            </div>
            {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 animate-pulse bg-blue-100" />
            ))}
            <div className="mt-5 flex gap-4">
                <div className="h-11 flex-1 animate-pulse bg-blue-100" />
                <div className="h-11 flex-1 animate-pulse bg-blue-100" />
            </div>
        </div>
    );
}
