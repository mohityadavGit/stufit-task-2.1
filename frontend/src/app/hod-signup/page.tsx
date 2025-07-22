"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function HODSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    school_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup/admin",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          school_id: Number(formData.school_id),
          role: "HOD",
        }
      );

      if (response.status === 201) {
        setError("");
        setSuccess("HOD account created successfully! Redirecting to login...");
        localStorage.setItem("temp_email", formData.email);
        const signupHodInfo = {
          admin_id: response.data.admin_id,
          username: response.data.username,
          email: response.data.email,
          full_name: response.data.full_name,
          role: response.data.role,
          school_id: response.data.school_id,
        };

        localStorage.setItem("signupHodInfo", JSON.stringify(signupHodInfo));

        setTimeout(() => {
          router.push("/login");
        }, 2000);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { status?: number } };
        if (axiosError.response?.status === 409) {
          setError("HOD already exists with this email or username");
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
        <div className="flex-1 flex flex-col justify-center items-center py-4 lg:py-8 px-4 sm:px-6 relative z-10">
          {/* Mobile Logo - only show on smaller screens */}
          <div className="lg:hidden mb-4">
            <div className="rounded-full bg-white shadow w-[80px] h-[80px] flex items-center justify-center">
              <Image
                src="/images/circlelogo.png"
                alt="STUFIT Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full max-w-[400px]">
            <h1 className="text-[1.8rem] sm:text-[2.2rem] leading-none font-roboto font-extrabold text-[#044974] text-center mb-4 lg:mb-6 tracking-tight">
              HOD SIGNUP
            </h1>

            <form className="w-full flex flex-col gap-3 sm:gap-4">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-[10px] text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-[10px] text-sm">
                  {success}
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="text-gray-950 w-full h-[48px] sm:h-[50px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                >
                  Username
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="text-gray-950 w-full h-[48px] sm:h-[50px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
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
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="text-gray-950 w-full h-[48px] sm:h-[50px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) =>
                    handleInputChange("full_name", e.target.value)
                  }
                  className="text-gray-950 w-full h-[48px] sm:h-[50px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="full_name"
                  className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                >
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="school_id"
                  value={formData.school_id}
                  onChange={(e) =>
                    handleInputChange("school_id", e.target.value)
                  }
                  className="text-gray-950 w-full h-[48px] sm:h-[50px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="school_id"
                  className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                >
                  School ID
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="hover:cursor-pointer w-full h-[48px] sm:h-[50px] mt-2 bg-[#044974] hover:bg-[#03375a] disabled:bg-gray-400 transition rounded-[10px] font-inter font-extrabold text-lg sm:text-xl text-white shadow"
              >
                {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="hover:cursor-pointer w-full text-[#044974] font-inter font-medium text-base hover:underline transition"
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
