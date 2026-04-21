"use client";

import { useState } from "react";
import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2, Code } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    try {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    } catch {
      // redirect will throw, that's OK
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white mx-auto mb-4">
            <Code className="h-7 w-7 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Masukkan password untuk mengakses dashboard
          </p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2  h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter admin password"
                    className="bg-gray-800 border-gray-700 text-white pl-10"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-950/50 border border-red-800 p-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Lock className="h-4 w-4 mr-2" />
                )}
                Login
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-600 mt-6">
          &copy; 2024 Jan Philip Faith. Admin Panel.
        </p>
      </div>
    </div>
  );
}
