
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isLogin) {
      await authClient.signIn.email({ email, password });
    } else {
      await authClient.signUp.email({ email, password, name });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isLogin ? "Log in" : "Create account"}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* FORM – ENBART AUTH */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full" type="submit">
            {isLogin ? "Log in" : "Sign up"}
          </Button>
        </form>

        {/* NAVIGATION – UTANFÖR FORM */}
        <p className="text-sm text-center text-muted-foreground">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => router.push(isLogin ? "/signup" : "/login")}
            className="underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
