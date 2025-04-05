"use client";

import { useState, useEffect } from "react";
import {
  FaTasks,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaComments,
  FaClipboardList,
  FaHourglassHalf,
  FaCog,
  FaCheckCircle
} from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import userAuth from "@/myStore/userAuth";
import axios from "axios";

export default function EditorSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const { logoutUser } = userAuth();

  const userService = process.env.NEXT_PUBLIC_USER_SERVICE_URL;

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${userService}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        logoutUser();
        router.replace("/");
        return;
      }
    } catch (error: any) {
      const message = error.response?.data?.error || "Server error";
      toast.error(message);
    }
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
    {
      path: "/Editor",
      icon: <FaTachometerAlt size={20} />,
      label: "Dashboard",
    },
    {
      path: "/Editor/My-Tasks",
      icon: <FaTasks size={20} />,
      label: "My Tasks",
      children: [
        {
          path: "/Editor/My-Tasks/All",
          icon: <FaClipboardList size={20} />,  
          label: "All Tasks",
        },
        {
          path: "/Editor/My-Tasks/assignedTasks",
          icon: <FaHourglassHalf size={20} />,  
          label: "Assigned Tasks",
        },
        {
          path: "/Editor/My-Tasks/status",
          icon: <FaCheckCircle size={20} />, 
          label: "Task Status Update",
        }
      ]
    },
    { path: "/Editor/Chats", icon: <FaComments size={20} />, label: "Chats" },
    {
      path: "/Editor/Payments",
      icon: <RiMoneyDollarBoxFill size={20} />,
      label: "Payments",
    },
    {
      path: "/Editor/Notifications",
      icon: <FaBell size={20} />,
      label: "Notifications",
    },
    { path: "/Editor/Settings", icon: <FaCog size={20} />, label: "Settings" },
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
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
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
              <span className="ml-2 text-sm font-medium">
                Astaan Film Department
              </span>
            </Link>
          </div>

          <nav className="flex flex-col space-y-1 p-4 flex-grow">
            {menuItems.map((item) => (
              <div key={item.path} className="flex flex-col">
                <button
                  onClick={() => {
                    if (item.children) {
                      setOpenSubMenu((prev) => !prev);
                    } else {
                      closeSidebar();
                      router.push(item.path);
                    }
                  }}
                  className={`flex items-center w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path) ||
                    (item.children && pathname.startsWith(item.path))
                      ? "bg-[#ff4e00] text-white font-medium shadow-md"
                      : "text-gray-700 hover:bg-[#fff0eb] hover:text-[#ff4e00]"
                  }`}
                >
                  <span
                    className={`${
                      isActive(item.path) ? "text-white" : "text-[#ff4e00]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.label}</span>
                  {item.children && (
                    <span className="ml-auto text-sm text-[#ff4e00]">
                      {openSubMenu ? "▲" : "▼"}
                    </span>
                  )}
                </button>

                 {item.children && openSubMenu && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className={`block text-sm p-2 rounded-lg transition-colors duration-200 ${
                          isActive(subItem.path)
                            ? "bg-[#ff4e00] text-white font-medium shadow"
                            : "text-gray-600 hover:bg-[#fff0eb] hover:text-[#ff4e00]"
                        }`}
                        onClick={closeSidebar}
                      >
                        <div className="flex">
                        <span className="text-[#ff4e00] mr-2">
                          {subItem.icon}
                        </span>
                        {subItem.label}
                        </div>
                       
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
