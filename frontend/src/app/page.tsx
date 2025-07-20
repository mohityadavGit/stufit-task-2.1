"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-[#F9F9F9]">
      <div className="relative flex w-full min-h-screen bg-white overflow-hidden">
        {/* LEFT PANEL */}
        <div className="relative hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#72BBE0] px-6 py-10">
          {/* SEMICIRCLE: Top Left - Lighter & Larger */}
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
          {/* SEMICIRCLE: Bottom Right - Darker & Much Larger */}
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
          {/* Logo */}
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
        </div>{" "}
        {/* RIGHT PANEL: Home Content */}
        <div className="flex-1 flex flex-col justify-center items-center py-4 lg:py-8 px-4 sm:px-6 relative z-10">
          {/* Mobile Logo - only show on smaller screens */}
          <div className="lg:hidden mb-6">
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
            <h1 className="text-[1.8rem] sm:text-[2.2rem] leading-none font-roboto font-extrabold text-[#044974] text-center mb-3 lg:mb-4 tracking-tight">
              Welcome to STUFIT
            </h1>

            <p className="text-center text-gray-600 font-inter text-sm sm:text-base mb-6 lg:mb-8">
              Choose your access level to get started
            </p>

            <div className="w-full flex flex-col gap-3 sm:gap-4">
              {/* HOD Login Button */}
              <button
                onClick={() => router.push("/hod-signup")}
                className="w-full h-[48px] sm:h-[50px] bg-[#044974] hover:bg-[#03375a] transition rounded-[10px] font-inter font-extrabold text-base sm:text-lg text-white shadow flex items-center justify-center gap-3"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18H3Z"
                    fill="currentColor"
                  />
                </svg>
                HOD Sign Up
              </button>

              {/* Student Login Button */}
              <button
                onClick={() => router.push("/student-signup")}
                className="w-full h-[48px] sm:h-[50px] bg-white hover:bg-gray-50 transition rounded-[10px] font-inter font-extrabold text-base sm:text-lg text-[#044974] shadow border-2 border-[#044974] flex items-center justify-center gap-3"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-[#044974]"
                >
                  <path
                    d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18H3Z"
                    fill="currentColor"
                  />
                </svg>
                Student Sign Up
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-1">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 font-inter text-sm">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => router.push("/login")}
                className="w-full h-[48px] sm:h-[50px] bg-gradient-to-r from-[#72BBE0] to-[#5aa3cc] hover:from-[#5aa3cc] hover:to-[#4a8db3] transition rounded-[10px] font-inter font-extrabold text-base sm:text-lg text-white shadow flex items-center justify-center gap-3"
              >
                Sign In
              </button>
            </div>

            {/* Footer text */}
            <p className="text-center text-gray-500 font-inter text-sm mt-4 lg:mt-6">
              Secure access to your health portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
