"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  mode?: "login" | "signup";
};

export function AuthForm({ mode = "login" }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(mode === "login");

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {isLogin ? "Log in" : "Create account"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="Your name" />
          </div>
        )}

        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="email@example.com" />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" />
        </div>

        <Button className="w-full">
          {isLogin ? "Log in" : "Sign up"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
