import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <AuthForm mode="login" />
    </main>
  );
}
