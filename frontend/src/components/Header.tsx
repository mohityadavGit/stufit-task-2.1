'use client';

import Image from 'next/image';
import { Bell, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface UserData {
  full_name?: string;
  email?: string;
  role: string;
}

export default function Header() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse user_data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const handleMouseEnter = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);  
  };

  return (
    <header className="bg-[#69b9f3] text-white flex items-center justify-between px-4 md:px-8 py-4 rounded-b-3xl shadow-md relative">
      <div className="flex items-center space-x-4">
        <Image src="/circleLogo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-lg md:text-xl font-semibold text-white">Stufit</h1>
      </div>

      <div
        className="flex items-center space-x-4 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Bell className="w-6 h-6 cursor-pointer" />
        <User className="w-6 h-6 cursor-pointer" />

        {showDropdown && userData && (
          <div className="absolute right-0 mt-15 w-60 bg-white text-black rounded-lg shadow-xl py-3 px-4 z-50">
            <p className="font-semibold text-base mb-1">
              {userData.full_name || 'Unknown User'}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              {userData.email || 'No Email'}
            </p>
            <p className="text-sm text-blue-600 capitalize mb-3">
              Role: {userData.role.replace(/_/g, ' ') || 'Unknown'}
            </p>

            <button
              onClick={handleLogout}
              className="text-red-600 text-sm flex items-center space-x-2 hover:underline"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
