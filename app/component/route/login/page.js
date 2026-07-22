"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

function RouteSignature() {
  return (
    <svg
      viewBox="0 0 480 360"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        id="flightpath-login"
        d="M 40 300 C 140 260, 160 120, 260 100 S 400 160, 440 60"
        fill="none"
        stroke="#FBF8F3"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />

      <circle cx="40" cy="300" r="4" fill="#D85A30" />
      <circle cx="440" cy="60" r="4" fill="#D85A30" />

      <g>
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
          <mpath href="#flightpath-login" />
        </animateMotion>
        <path
          d="M0 -6 L6 0 L0 6 L1.5 0 Z"
          fill="#D85A30"
          transform="scale(1.6)"
        />
      </g>
    </svg>
  );
}

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-sand-50">
      {/* Left panel — signature visual, hidden on small screens */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/banner1.jpg"
          alt="Turquoise alpine lake with a cliffside road and a passenger boat"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/20 to-teal-900/40" />

        <RouteSignature />

        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="text-sand-50">
            <p className="text-sm font-medium tracking-wide">ai-traveler</p>
          </div>

          <div className="max-w-sm">
            <h1 className="text-3xl font-medium leading-snug text-sand-50">
              Welcome back.
              <br />
              Your next trip is waiting.
            </h1>
            <p className="mt-3 text-sm text-sand-50/80">
              Pick up where you left off — saved itineraries, budgets, and
              preferences are right where you left them.
            </p>
          </div>

          <div className="rounded-xl border border-sand-50/20 bg-sand-900/40 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-sand-50/70">
              This week
            </p>
            <p className="mt-1 text-base font-medium text-sand-50">
              12,400 trips planned
            </p>
            <p className="text-sm text-sand-50/70">across 63 countries</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-600">
              <Plane className="h-4 w-4 text-sand-50" strokeWidth={2} />
            </div>
            <p className="text-sm font-medium text-sand-900">ai-traveler</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-medium tracking-tight text-sand-900">
              Log in
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-sand-900/60">
              Enter your details to access your saved trips.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-coral-500/30 bg-coral-50 px-3 py-2 text-sm text-coral-900">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-sand-900/80"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-900/35" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-10 bg-sand-100 border-sand-900/15 pl-9 focus-visible:ring-teal-600 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-sand-900/80"
                >
                  Password
                </Label>
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-teal-600 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-900/35" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="h-10 bg-sand-100 border-sand-900/15 pl-9 pr-9 focus-visible:ring-teal-600 focus-visible:ring-offset-0"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-900/35 hover:text-sand-900/60"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                </button>
              </div>
            </div>

            <label className="mt-1 flex items-center gap-2 text-sm text-sand-900/70">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-sand-900/25 text-teal-600 focus:ring-teal-600"
              />
              Keep me signed in
            </label>

            <Button
              
              disabled={loading}
              className="mt-2 h-10 w-full bg-coral-500 font-medium text-sand-50 hover:bg-coral-900 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>

            <div className="relative my-1 flex items-center">
              <div className="h-px flex-1 bg-sand-900/10" />
              <span className="px-3 text-xs text-sand-900/40">or</span>
              <div className="h-px flex-1 bg-sand-900/10" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-10 w-full border-sand-900/15 font-medium text-sand-900 hover:bg-sand-100"
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0 0 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.28a12 12 0 0 0 0 10.78l3.99-3.11Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l3.99 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
                />
              </svg>
              Continue with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-sand-900/50">
            Don&apos;t have an account?{" "}
            <a
              href="/component/route/signup"
              className="font-medium text-teal-600 underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
