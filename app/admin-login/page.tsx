"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          router.replace("/en/admin/articles/new");
        } else {
          setError(data.error || "Login failed");
          setPassword("");
        }
      } else {
        setError("Invalid password");
        setPassword("");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Writers Access
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your password to access the writers area
            </p>
          </div>

          {error && (
            <div
              className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-md"
              role="alert"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              disabled={isLoading}
              required
              autoComplete="current-password"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
