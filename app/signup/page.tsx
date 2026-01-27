import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <AuthForm mode="signup" />
    </main>
  )
}
