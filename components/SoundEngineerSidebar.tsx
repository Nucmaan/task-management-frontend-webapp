"use client";

import { useState, useEffect } from "react";
import {
  FaUsers,
  FaTasks,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaProjectDiagram,
  FaTimes,
  FaChartBar,
  FaBell,
  FaComments,
  FaMoneyCheckAlt,
  FaUserCheck,
  FaCog
  
} from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import userAuth from "@/myStore/userAuth";

export default function SoundEngineerSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const logoutUser = userAuth((state) => state.logoutUser);


  const handleLogout = () => {
    logoutUser(); 
    toast.success("Logged out successfully.");
    router.replace("/");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path) => pathname === path;

  const menuItems = [
    { path: "/Sound-Engineer", icon: <FaTachometerAlt size={20} />, label: "Dashboard" },
    { path: "/Sound-Engineer/My-Tasks", icon: <FaTasks size={20} />, label: "My Tasks" },  
    { path: "/Sound-Engineer/Chats", icon: <FaComments size={20} />, label: "Chats" },  
    { path: "/Sound-Engineer/Payments", icon: <RiMoneyDollarBoxFill size={20} />, label: "Payments" },    
    { path: "/Sound-Engineer/Notifications", icon: <FaBell size={20} />, label: "Notifications" },   
    { path: "/Sound-Engineer/Settings", icon: <FaCog size={20} />, label: "Settings" },
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {isMobile && (
        <button
          className="p-3 bg-[#ff4e00] text-white fixed top-4 left-4 z-50 rounded-lg shadow-lg hover:bg-[#e64500] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-gradient-to-b from-[#ffffff] to-[#f7f7f7] shadow-sm transition-transform duration-300 ease-in-out ${
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        } z-40`}
      >
        <div className="flex flex-col h-full">
          <div className="py-4 px-6 border-b border-gray-200 h-16 flex items-center">
            <Link href="/" className="flex items-center w-full">
              <Image
                src="/astan_Logo.png"
                alt="Astaan Logo"
                width={32}
                height={32}
                className="object-contain flex-shrink-0"
                priority
              />
              <span className="ml-2 text-sm font-medium">Astaan Film Department</span>
            </Link>
          </div>

          <nav className="flex flex-col space-y-1 p-4 flex-grow">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path) 
                    ? "bg-[#ff4e00] text-white font-medium shadow-md" 
                    : "text-gray-700 hover:bg-[#fff0eb] hover:text-[#ff4e00]"
                }`}
                onClick={closeSidebar}
              >
                <span className={`${isActive(item.path) ? "text-white" : "text-[#ff4e00]"}`}>
                  {item.icon}
                </span>
                <span className="ml-3">{item.label}</span>
                {isActive(item.path) && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>
                )}
              </Link>
            ))}
          </nav>

           <div className="p-4 mt-auto border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 bg-[#ff4e00] text-white hover:bg-[#e64500] rounded-lg transition-colors duration-200 font-medium"
            >
              <FaSignOutAlt size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

       {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}