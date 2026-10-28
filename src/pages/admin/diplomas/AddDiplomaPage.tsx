import { useNavigate } from "react-router-dom";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import { useCreateDiploma } from "@/features/admin/diplomas/hooks/useCreateDiploma";
import type { DiplomaBody } from "@/features/admin/diplomas/types";
import DiplomaForm from "@/features/admin/diplomas/components/DiplomaForm";
import FormActions from "@/features/admin/shared/components/FormActions";

// formId: الرابط بين زرار Save اللي فوق والفورم اللي تحت
const FORM_ID = "diploma-form";

export default function AddDiplomaPage() {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useCreateDiploma();

    function handleSubmit(body: DiplomaBody) {
        // بعد ما تتضاف، ارجع للجدول
        mutate(body, { onSuccess: () => navigate("/admin/diplomas") });
    }

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Diplomas", to: "/admin/diplomas" }, { label: "Add New Diploma" }]}>
                <div />
                <FormActions formId={FORM_ID} cancelTo="/admin/diplomas" isPending={isPending} />
            </AdminPageHeader>

            <div className="p-6">
                <DiplomaForm
                    formId={FORM_ID}
                    defaultValues={{ title: "", description: "", image: "" }}
                    onSubmit={handleSubmit}
                    error={error}
                />
            </div>
        </>
    );
}
