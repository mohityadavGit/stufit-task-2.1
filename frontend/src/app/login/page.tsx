"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("temp_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async () => {
    console.log("Login button clicked");
    console.log("Email entered:", email);
    console.log("Password entered:", password ? "****" : "(empty)");

    if (!email || !password) {
      setError("Please enter both email and password");
      console.log("Validation failed: email or password missing");
      return;
    }

    if (loading) {
      console.log("Login already in progress, ignoring duplicate click");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Sending login request to backend...");
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log("Response received:", response);

      if (response.status === 200 || response.status === 201) {
        setError("");
        setSuccess("OTP sent to your email! Redirecting...");

        localStorage.setItem("temp_email", email);

        setTimeout(() => {
          router.push("/otp");
        }, 1500);
      }
    } catch (err: unknown) {
      console.error("Login error caught:", err);
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { status?: number } };
        if (axiosError.response?.status === 400) {
          setError("Invalid email or password");
          console.log("Error: Invalid email or password");
        } else {
          setError("Something went wrong. Please try again.");
          console.log("Error: Something went wrong on server");
        }
      } else {
        setError("Something went wrong. Please try again.");
        console.log("Error: Unknown error");
      }
    } finally {
      setLoading(false);
      console.log("Login process ended, loading set to false");
    }
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
            <h1 className="text-[2rem] sm:text-[2.5rem] leading-none font-roboto font-extrabold text-[#044974] text-center mb-6 lg:mb-10 tracking-tight">
              SIGN IN
            </h1>

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
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-gray-950 w-full h-[52px] sm:h-[56px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-gray-950 w-full h-[52px] sm:h-[56px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                >
                  Password
                </label>
                {/* "Show/Hide" icon placeholder */}
                {/* <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40">
                  <svg width="22" height="18" fill="none" viewBox="0 0 22 18">
                    <ellipse
                      cx="11"
                      cy="9"
                      rx="11"
                      ry="9"
                      fill="#000"
                      fillOpacity="0.28"
                    />
                  </svg>
                </span> */}
                <a
                  href="#"
                  tabIndex={-1}
                  className="absolute right-0 bottom-[-28px] text-[#044974] text-[14px] font-extrabold font-inter hover:underline transition"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full hover:cursor-pointer h-[52px] sm:h-[56px] mt-2 bg-[#044974] hover:bg-[#03375a] disabled:bg-gray-400 disabled:cursor-not-allowed transition rounded-[10px] font-inter font-extrabold text-lg sm:text-xl text-white shadow"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full hover:cursor-pointer text-[#044974] font-inter font-medium text-base hover:underline transition mt-4"
              >
                Back to Home
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
