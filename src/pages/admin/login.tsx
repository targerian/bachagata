import type React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, SEO } from "@/common/components";
import { FadeIn } from "@/common/animations";

const AdminLoginPage: React.FC = () => {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin Login"
        description="Sign in to manage your content"
        noindex={true}
      />
      <main className="flex min-h-screen items-center justify-center px-4 py-16">
        <FadeIn className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-4xl font-bold text-rose-gold mb-2">
              Admin Login
            </h1>
            <p className="text-text-secondary text-sm">
              Sign in to manage your content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </FadeIn>
    </main>
    </>
  );
};

export default AdminLoginPage;

