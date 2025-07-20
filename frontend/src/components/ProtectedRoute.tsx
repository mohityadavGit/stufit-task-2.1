"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUtils } from "@/lib/auth";

function normalizeRole(role: string) {
  return role.toLowerCase().replace(/_/g, "-");
}

export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const router = useRouter();

  useEffect(() => {
    const role = authUtils.getUserRole();
    console.log("🔐 User Role:", role);

    if (!role || !allowedRoles.map(normalizeRole).includes(normalizeRole(role))) {
      console.warn("Unauthorized access, redirecting...");
      router.push("/login");
    }
  }, [allowedRoles, router]);

  return <>{children}</>;
}
