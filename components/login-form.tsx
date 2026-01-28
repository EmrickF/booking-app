"use client"


export function LoginForm() {
  return (
<button
  onClick={() => {
    window.location.href = "/api/auth/sign-in/github"
  }}
>
  Sign in with GitHub
</button>

  )
}
