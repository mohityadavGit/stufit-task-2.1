"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function StudentSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    adhar_number: "",
    school_id: "",
    session: "",
    grade: "",
    gender: "",
    admission_date: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.full_name ||
      !formData.adhar_number ||
      !formData.school_id
    ) {
      setError(
        "Please fill in all required fields (Username, Email, Password, Full Name, Aadhaar Number, School ID)"
      );
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!/^\d{12}$/.test(formData.adhar_number)) {
      setError("Aadhaar number must be exactly 12 digits");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup/student",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          adhar_number: formData.adhar_number,
          school_id: parseInt(formData.school_id),
          session: formData.session || null,
          grade: formData.grade || null,
          gender: formData.gender || null,
          admission_date: formData.admission_date
            ? new Date(formData.admission_date).toISOString()
            : null,
          dob: formData.dob ? new Date(formData.dob).toISOString() : null,
        }
      );

      if (response.status === 201) {
        setError("");
        setSuccess(
          "Student account created successfully! Redirecting to login..."
        );

        // ✅ Save student info in localStorage
        const signupStudentInfo = {
          student_id: response.data.student_id, // <- assuming this comes from backend
          username: response.data.username,
          email: response.data.email,
          full_name: response.data.full_name,
          adhar_number: response.data.adhar_number,
          role: response.data.role || "STUDENT", // <- if backend doesn't return role, set manually
          school_id: response.data.school_id,
          session: response.data.session || null,
          grade: response.data.grade || null,
          gender: response.data.gender || null,
          admission_date: response.data.admission_date || null,
          dob: response.data.dob || null,
        };

        localStorage.setItem(
          "signupStudentInfo",
          JSON.stringify(signupStudentInfo)
        );
        localStorage.setItem("temp_email", formData.email);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { status?: number } };
        if (axiosError.response?.status === 409) {
          setError("Student already exists with this email or username");
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
    <div className="h-screen flex bg-[#F9F9F9] overflow-hidden">
      <div className="relative flex w-full h-screen bg-white">
        {/* LEFT PANEL - Fixed and unscrollable */}
        <div className="relative hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#72BBE0] px-6 py-10 h-screen overflow-hidden">
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

        {/* RIGHT PANEL: Form - Scrollable */}
        <div className="flex-1 h-screen overflow-y-auto">
          <div className="flex flex-col justify-center items-center py-6 lg:py-8 px-4 sm:px-6 relative z-10 min-h-full">
            {/* Mobile Logo - only show on smaller screens */}
            <div className="lg:hidden mb-3">
              <div className="rounded-full bg-white shadow w-[70px] h-[70px] flex items-center justify-center">
                <Image
                  src="/images/circlelogo.png"
                  alt="STUFIT Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="w-full max-w-[400px] pb-6">
              <h1 className="text-[1.7rem] sm:text-[2rem] leading-none font-roboto font-extrabold text-[#044974] text-center mb-3 lg:mb-4 tracking-tight">
                STUDENT SIGNUP
              </h1>

              <form className="w-full flex flex-col gap-2.5 sm:gap-3">
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
                    className="w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-gray-950 font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
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
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
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
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
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
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
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
                    id="adhar_number"
                    value={formData.adhar_number}
                    onChange={(e) =>
                      handleInputChange("adhar_number", e.target.value)
                    }
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="adhar_number"
                    className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                  >
                    Aadhaar Number
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
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="school_id"
                    className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                  >
                    School ID
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="session"
                    value={formData.session}
                    onChange={(e) =>
                      handleInputChange("session", e.target.value)
                    }
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="session"
                    className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                  >
                    Session (e.g., 2024-25)
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => handleInputChange("grade", e.target.value)}
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="grade"
                    className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:translate-y-0"
                  >
                    Grade/Class
                  </label>
                </div>

                <div className="relative">
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none"
                  >
                    Gender
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    id="dob"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  />
                  <label
                    htmlFor="dob"
                    className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none"
                  >
                    Date of Birth
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    id="admission_date"
                    value={formData.admission_date}
                    onChange={(e) =>
                      handleInputChange("admission_date", e.target.value)
                    }
                    className="text-gray-950 w-full h-[46px] sm:h-[48px] rounded-[10px] border border-gray-400 bg-white px-4 text-base font-inter focus:outline-none focus:ring-2 focus:ring-[#044974] peer"
                  />
                  <label
                    htmlFor="admission_date"
                    className="absolute left-3 -top-2.5 px-2 bg-white text-[#044974] font-inter font-medium text-sm transition-all duration-300 pointer-events-none"
                  >
                    Admission Date
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="hover:cursor-pointer w-full h-[46px] sm:h-[48px] mt-2 bg-[#044974] hover:bg-[#03375a] disabled:bg-gray-400 disabled:cursor-not-allowed transition rounded-[10px] font-inter font-extrabold text-lg sm:text-xl text-white shadow"
                >
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="w-full text-[#044974] font-inter font-medium text-base hover:cursor-pointer   hover:underline transition"
                >
                  Back to Home
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
