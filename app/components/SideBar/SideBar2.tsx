"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { sidebarItems } from "./SideBarItemsArray";
import { useTranslations } from "next-intl";
import { FaBars } from "react-icons/fa";
import Divider from "./Divider";
import LinkItem from "./LinkItem";

const Sidebar = () => {
  const pathname = usePathname();
  const t = useTranslations("sidebarItems");

  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
  const [submenuOpen, setSubmenuOpen] = useState<number | null>(null); // Manage submenu states

  // Determine current locale
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

  const toggleSubmenu = (id: number) => {
    setSubmenuOpen((prev) => (prev === id ? null : id));
  };

  const toggleLocale = () => {
    const newLocale = currentLocale === "ar" ? "en" : "ar";
    const newPath = `/${newLocale}${pathname.replace(/^\/(en|ar)/, "")}`;
    window.location.assign(newPath); // Update locale
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } bg-secondary-dark text-white h-screen transition-all duration-300 text-sm flex-shrink-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-300 hover:text-white"
          >
            <FaBars className="w-6 h-6" />
          </button>
          <span
            className={`text-lg font-semibold whitespace-nowrap transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 invisible"
            }`}
          >
           test
          </span>
        </div>
      </div>

      <Divider />

      {/* Sidebar Items */}
      <nav className="flex flex-col p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
        {sidebarItems.map((item, index) => (
          <div key={`sidebar-item-${index}`}>
            <LinkItem
              item={item}
              t={t}
              sidebarOpen={sidebarOpen}
              submenuOpen={submenuOpen}
              toggleSubmenu={toggleSubmenu}
              currentLocale={currentLocale}
              toggleLocale={item.isLocaleToggle ? toggleLocale : undefined}
            />
          </div>
        ))}

       
      </nav>
    </div>
  );
};

export default Sidebar;
