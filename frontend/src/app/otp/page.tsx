"use client";

import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Image from "next/image";
import axios from "axios";

// Auth utilities
const authUtils = {
  saveAuth: (token: string, user: any) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_role", user.role);
    localStorage.setItem("user_data", JSON.stringify(user));
  },
  getDashboardRoute: (role: string) => {
    const key = role.toLowerCase().replace(/_/g, "-");
    switch (key) {
      case "super-admin":
        return "/dashboard/super-admin";
      case "admin":
        return "/dashboard/admin";
      case "hod":
        return "/dashboard/hod";
      case "student":
        return "/dashboard/student";
      case "user":
        return "/dashboard/user";
      default:
        return "/";
    }
  }
};

function OtpPageContent() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Enter a 6-digit OTP");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const email = localStorage.getItem("temp_email");
      if (!email) {
        setError("Session expired. Please login again.");
        router.push("/login");
        return;
      }

      const response = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      if (response.status === 200 || response.status === 201) {
        const { access_token, role, profile } = response.data;
        const user = { role, ...profile };

        // Save token & user profile
        authUtils.saveAuth(access_token, user);

        setSuccess("OTP verified! Redirecting...");

        const dashboardRoute = authUtils.getDashboardRoute(role);
        setTimeout(() => {
          router.push(dashboardRoute);
        }, 1500);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { status?: number } };
        if (axiosError.response?.status === 400) {
          setError("Invalid or expired OTP");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#F9F9F9]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#72BBE0] px-6 py-10">
        <Image src="/images/circlelogo.png" alt="STUFIT Logo" width={120} height={120} />
        <h2 className="text-2xl font-bold text-white mt-6">Our journey toward a healthier future</h2>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-[#044974] mb-6">OTP Verification</h1>
          <p className="text-center text-gray-600 mb-4">OTP sent to your email</p>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

          <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-center"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#044974] hover:bg-[#03375a] text-white font-bold py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-full mt-4 text-[#044974] hover:underline"
            >
              Back to Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpPageContent />
    </Suspense>
  );
}
