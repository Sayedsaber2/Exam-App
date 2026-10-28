import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../api/users.api";

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],   // نفس المفتاح في أي مكان → طلب واحد بس
        queryFn: getProfileApi,
    });
}
