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
  },
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

      const response = await axios.post(
        "http://localhost:5000/auth/verify-otp",
        {
          email,
          otp,
        }
      );

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
      <div className="relative flex w-full min-h-screen bg-white overflow-hidden">
        {/* LEFT PANEL */}
        <div className="relative hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#72BBE0] px-6 py-10">
          <div className="absolute top-0 left-0 z-0">
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
              <circle
                cx="0"
                cy="0"
                r="80"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
                opacity="0.3"
              />
            </svg>
          </div>

          <div className="absolute bottom-0 right-0 z-0">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle
                cx="200"
                cy="200"
                r="120"
                fill="none"
                stroke="#fff"
                strokeWidth="8"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="rounded-full bg-white shadow w-[140px] h-[140px] flex items-center justify-center mb-6">
              <Image
                src="/images/circlelogo.png"
                alt="STUFIT Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <h2 className="font-roboto font-extrabold text-2xl mt-2 leading-snug text-[#044974] text-center">
              Our journey
              <br />
              towards healthier
              <br />
              future
            </h2>
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="flex-1 flex flex-col justify-center items-center py-8 lg:py-14 px-4 sm:px-6 relative z-10">
          {/* Mobile Logo - only show on smaller screens */}
          <div className="lg:hidden mb-8">
            <div className="rounded-full bg-white shadow w-[100px] h-[100px] flex items-center justify-center">
              <Image
                src="/images/circlelogo.png"
                alt="STUFIT Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full max-w-[400px]">
            <h1 className="text-[2rem] sm:text-[2.5rem] leading-none font-roboto font-extrabold text-[#044974] text-center mb-2 lg:mb-4 tracking-tight">
              OTP Verification
            </h1>
            <p className="text-center text-gray-600 font-inter text-sm mb-6 lg:mb-8">
              OTP sent to your email
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form className="w-full flex flex-col gap-5 sm:gap-7">
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  maxLength={6}
                  autoComplete="off"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="text-gray-950 w-full h-[52px] sm:h-[56px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer text-center tracking-widest"
                  placeholder=" "
                />
                <label
                  htmlFor="otp"
                  className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                >
                  Enter the OTP
                </label>
              </div>

              {/* Verify Button */}
              <button
                type="button"
                onClick={handleVerify}
                disabled={loading}
                className="hover:cursor-pointer w-full h-[52px] sm:h-[56px] mt-2 bg-[#044974] hover:bg-[#03375a] disabled:bg-gray-400 disabled:cursor-not-allowed transition rounded-[10px] font-inter font-extrabold text-lg sm:text-xl text-white shadow"
              >
                {loading ? "VERIFYING..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full hover:cursor-pointer text-[#044974] font-inter font-medium text-base hover:underline transition"
              >
                Back to Sign In
              </button>
            </form>
          </div>
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
