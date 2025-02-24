"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CrudDataGrid from "@/app/components/CrudDataGrid/CrudDataGrid";

// Define types for user activity
type UserActivity = {
  id: number;
  name: string;
  role: string;
  branch: string;
  area: string;
  status: "online" | "offline" | "idle";
  loginTime: string | null; // Added login time
  logoutTime: string | null; // Added logout time
};

const initialUserActivity: UserActivity[] = [
  {
    id: 1,
    name: "Ahmed Saleh",
    role: "Branch Manager",
    branch: "Branch 1",
    area: "Area 1",
    status: "online",
    loginTime: "2024-12-18 08:00",
    logoutTime: null,
  },
  {
    id: 2,
    name: "Fatima Ali",
    role: "Area Manager",
    branch: "Branch 2",
    area: "Area 2",
    status: "offline",
    loginTime: "2024-12-18 08:15",
    logoutTime: "2024-12-18 12:15",
  },
  {
    id: 3,
    name: "Khaled Mohamed",
    role: "Director",
    branch: "All",
    area: "All",
    status: "offline",
    loginTime: "2024-12-17 09:00",
    logoutTime: "2024-12-17 10:00",
  },
];

const UserActivityMonitoring = () => {
  const t = useTranslations("userActivity");
  const [userData, setUserData] = useState<UserActivity[]>(initialUserActivity);

  const columns = [
    { key: "id", label: t("id") },
    { key: "name", label: t("name") },
    { key: "role", label: t("role") },
    { key: "branch", label: t("branch") },
    { key: "area", label: t("area") },
    { key: "status", label: t("status") },
    { key: "loginTime", label: t("loginTime") }, // Added login time column
    { key: "logoutTime", label: t("logoutTime") }, // Added logout time column
  ];

  const getStatusBadge = (status: UserActivity["status"]) => {
    switch (status) {
      case "online":
        return (
          <span className="text-green-600 font-semibold">{t("online")}</span>
        );
      case "offline":
        return (
          <span className="text-red-600 font-semibold">{t("offline")}</span>
        );
      case "idle":
        return (
          <span className="text-yellow-600 font-semibold">{t("idle")}</span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      <header className="text-2xl font-bold text-primary mb-4">
        {t("headerTitle")}
      </header>

      {/* Data Grid Section */}
      <section>
        <CrudDataGrid
          data={userData.map((user) => ({
            id: user.id,
            name: user.name,
            role: user.role,
            branch: user.branch,
            area: user.area,
            status: getStatusBadge(user.status),
            loginTime: user.loginTime || t("notAvailable"), // Display login time or fallback
            logoutTime: user.logoutTime || t("notAvailable"), // Display logout time or fallback
          }))}
          columns={columns}
          showSearchBar={true}
          onSearch={(value) =>
            setUserData(
              initialUserActivity.filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
              )
            )
          }
          onDropdownSelect={(value) => console.log("Filtered by:", value)}
          dropdownOptions={[
            t("filterAll"),
            t("filterOnline"),
            t("filterIdle"),
            t("filterOffline"),
          ]}
          showActions={false}
        />
      </section>
    </div>
  );
};

export default UserActivityMonitoring;
