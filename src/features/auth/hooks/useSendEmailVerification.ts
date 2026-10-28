import { useMutation } from "@tanstack/react-query";
import { sendEmailVerificationApi } from "../api/auth.api";
import { toast } from "sonner";

export default function useSendEmailVerification() {
  return useMutation({ mutationFn: sendEmailVerificationApi,
  onSuccess: (message) => toast.success(message)
  })
}
