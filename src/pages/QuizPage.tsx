import { useState } from "react";
import { useParams } from "react-router-dom";
import { CircleQuestionMark } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useExam } from "@/features/exams/hooks/useExam";
import { useQuestions } from "@/features/questions/hooks/useQuestions";
import QuizRunner from "@/features/quiz/components/QuizRunner";

export default function QuizPage() {
  const { examId = "" } = useParams();

  // رقم المحاولة: كل Restart بيزوّده → الـ key بيتغير → QuizRunner بيتعمله unmount وmount من جديد بـ state نضيفة
  const [attempt, setAttempt] = useState(0);

  // طلبين بيتبعتوا في نفس الوقت: بيانات الامتحان (العنوان + المدة) والأسئلة
  const exam = useExam(examId);
  const questions = useQuestions(examId);

  if (exam.isError) return <ErrorAlert message={getErrorMessage(exam.error)} />;
  if (questions.isError) return <ErrorAlert message={getErrorMessage(questions.error)} />;

  // البوابة: QuizRunner ميتعملوش mount غير والداتا الاتنين جاهزين (عشان التايمر يبدأ بالمدة الصح)
  if (!exam.data || !questions.data) return <QuizSkeleton />;

  if (questions.data.length === 0) {
    return <p className="text-muted-foreground">No questions in this exam yet.</p>;
  }

  const backTo = `/diplomas/${exam.data.diplomaId}`;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<CircleQuestionMark />}
        title={`${exam.data.title} Questions`}
        crumbs={[
          { label: "Diplomas", to: "/" },
          { label: exam.data.diploma?.title ?? "...", to: backTo },
          { label: exam.data.title },
        ]}
        backTo={backTo}
      />
      <QuizRunner
        key={attempt}
        exam={exam.data}
        questions={questions.data}
        onRestart={() => setAttempt((a) => a + 1)}
      />
    </div>
  );
}

function QuizSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-20 animate-pulse bg-blue-100" />
      <div className="space-y-4 bg-background p-6">
        <div className="h-4 w-1/3 animate-pulse bg-blue-100" />
        <div className="h-6 w-2/3 animate-pulse bg-blue-100" />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-12 animate-pulse bg-blue-100" />
        ))}
      </div>
    </div>
  );
}
