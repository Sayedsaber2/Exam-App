import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setDiplomaImmutableApi } from "@/features/admin/diplomas/api/admin-diplomas.api";

type Variables = { id: string; immutable: boolean };

export function useSetDiplomaImmutable() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, immutable }: Variables) => setDiplomaImmutableApi(id, immutable),
        onSuccess: (_message, { id, immutable }) => {
            queryClient.invalidateQueries({ queryKey: ["admin-diplomas"] });
            queryClient.invalidateQueries({ queryKey: ["diploma", id] });
            toast.success(immutable ? "Diploma locked" : "Diploma unlocked");
        },
    });
}
