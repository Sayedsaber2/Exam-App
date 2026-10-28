import { useMutation } from "@tanstack/react-query";
import { submitExamApi } from "../api/submissions.api";

// no onSuccess here: the page needs the result (analytics) to show the results screen
export function useSubmitExam() {
    return useMutation({ mutationFn: submitExamApi });
}
