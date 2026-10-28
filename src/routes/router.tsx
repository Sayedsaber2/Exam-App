import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DiplomasPage from "@/pages/DiplomasPage";
import ExamsPage from "@/pages/ExamsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import QuizPage from "@/pages/QuizPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDiplomasPage from "@/pages/admin/diplomas/AdminDiplomasPage";
import AddDiplomaPage from "@/pages/admin/diplomas/AddDiplomaPage";
import EditDiplomaPage from "@/pages/admin/diplomas/EditDiplomaPage";
import ViewDiplomaPage from "@/pages/admin/diplomas/ViewDiplomaPage";
import AdminExamsPage from "@/pages/admin/exams/AdminExamsPage";
import AddExamPage from "@/pages/admin/exams/AddExamPage";
import EditExamPage from "@/pages/admin/exams/EditExamPage";
import ViewExamPage from "@/pages/admin/exams/ViewExamPage";
import AddQuestionPage from "@/pages/admin/questions/AddQuestionPage";
import EditQuestionPage from "@/pages/admin/questions/EditQuestionPage";
import ViewQuestionPage from "@/pages/admin/questions/ViewQuestionPage";
import AuditLogsPage from "@/pages/admin/audit-logs/AuditLogsPage";
import ViewAuditLogPage from "@/pages/admin/audit-logs/ViewAuditLogPage";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import ChangePasswordPage from "@/pages/account/ChangePasswordPage";
import ProfilePage from "@/pages/account/ProfilePage";
import AccountLayout from "@/layouts/AccountLayout";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <DiplomasPage /> },
          { path: "diplomas/:diplomaId", element: <ExamsPage /> },
          { path: "exams/:examId", element: <QuizPage /> },
          {
            path: "account", element: <AccountLayout />,
            children: [
              { index: true, element: <ProfilePage /> },
              { path: "change-password", element: <ChangePasswordPage /> }
            ]
          },

        ],
      },
      // لوحة الأدمن: حارس تاني (أدمن بس) → layout غامق → الصفحات
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <Navigate to="/admin/diplomas" replace /> }, // /admin لوحدها → الدبلومات
              { path: "diplomas", element: <AdminDiplomasPage /> },
              // الراوتر بيفضّل الكلمة الثابتة على المتغيرة، فصفحة الإضافة مش هتتلخبط مع صفحة العرض
              { path: "diplomas/new", element: <AddDiplomaPage /> },
              { path: "diplomas/:diplomaId", element: <ViewDiplomaPage /> },
              { path: "diplomas/:diplomaId/edit", element: <EditDiplomaPage /> },
              { path: "exams", element: <AdminExamsPage /> },
              { path: "exams/new", element: <AddExamPage /> },
              { path: "exams/:examId", element: <ViewExamPage /> },
              { path: "exams/:examId/edit", element: <EditExamPage /> },
              { path: "questions/new", element: <AddQuestionPage /> },
              { path: "questions/:questionId", element: <ViewQuestionPage /> },
              { path: "questions/:questionId/edit", element: <EditQuestionPage /> },
              { path: "audit-logs", element: <AuditLogsPage /> },
              { path: "audit-logs/:logId", element: <ViewAuditLogPage /> },
            ],
          },
        ],
      },
    ]
  },
  {
    element: <GuestRoute />, children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
      }]
  },
  { path: "*", element: <NotFoundPage /> },
]);
