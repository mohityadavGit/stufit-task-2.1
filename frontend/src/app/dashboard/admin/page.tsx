"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function AdminDashboard() {
  const [adminInfo, setAdminInfo] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");
    const userData = localStorage.getItem("user_data");
    const email = localStorage.getItem("temp_email");

    setAdminInfo({
      access_token: token,
      role,
      email,
      user_data: userData ? JSON.parse(userData) : null,
    });
  }, []);

  if (!adminInfo) return <div className="p-6 text-center">Loading Admin Data...</div>;

  // Helper to truncate token for display
  const truncateToken = (token: string | null) => {
    if (!token) return "No token";
    return token.length > 20 ? token.slice(0, 20) + "..." : token;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] px-4 pt-16">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#044974] mb-4 text-center">
            Welcome, Admin 👋
          </h1>

          <div className="text-sm text-gray-700 space-y-2">
            <p><span className="font-semibold">Email:</span> {adminInfo.email || "N/A"}</p>
            <p><span className="font-semibold">Role:</span> {adminInfo.role || "N/A"}</p>
            <p><span className="font-semibold">Token:</span></p>
            <div className="p-2 bg-gray-100 rounded text-[12px] break-words font-mono">
              {truncateToken(adminInfo.access_token)}
            </div>
            {adminInfo.user_data && (
              <>
                <p className="mt-4 font-semibold">Raw User Data:</p>
                <pre className="p-2 bg-gray-100 rounded text-[12px] font-mono overflow-x-auto max-h-60">
                  {JSON.stringify(adminInfo.user_data, null, 2)}
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
