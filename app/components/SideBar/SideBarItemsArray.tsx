import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaBan,
  FaDatabase,
  FaCog,
  FaFileAlt,
  FaSignOutAlt,
  FaUsers,
  FaList,
  FaLanguage,
} from "react-icons/fa";


export const sidebarItems = [
  {
    id: 1,
    label: "dashboard", // Translations key for "Dashboard"
    path: "/dashboard",
    icon: FaTachometerAlt,
    children: [],
  },
  {
    id: 2,
    label: "transactions", // Translations key for "Transactions"
    path: "/transactions",
    icon: FaExchangeAlt,
    children: [],
  },
  {
    id: 3,
    label: "unblock", // Translations key for "Block"
    path: "/unblock",
    icon: FaBan,
    children: [],
  },
  {
    id: 3,
    label: "block", // Translations key for "Block"
    path: "/block",
    icon: FaBan,
    children: [],
  },
  {
    id: 4,
    label: "definitions.label", // Translations key for "Definitions"
    path: "/definitions",
    icon: FaDatabase,
    children: [
      {
        id: 5,
        label: "definitions.userManagement", // Translations key for "User Management"
        path: "/definitions/userManagement",
        icon: FaUsers,
      },
      {
        id: 6,
        label: "definitions.branchManagement", // Translations key for "Branch Management"
        path: "/definitions/branchManagement",
        icon: FaList,
      },
      {
        id: 7,
        label: "definitions.areaManagement", // Translations key for "Area Management"
        path: "/definitions/areaManagement",
        icon: FaDatabase,
      },
      {
        id: 8,
        label: "definitions.reasonsManagement", // Translations key for "Reasons Management"
        path: "/definitions/reasonsManagement",
        icon: FaFileAlt,
      },
      {
        id: 9,
        label: "definitions.sourcesManagement", // Translations key for "Sources Management"
        path: "/definitions/sourcesManagement",
        icon: FaCog,
      },
    ],
  },
  {
    id: 10,
    label: "settings", // Translations key for "Settings"
    path: "/settings",
    icon: FaCog,
    children: [],
  },

  {
    id: 11,
    label: "documents", // Translations key for "Reports"
    path: "/documents",
    icon: FaFileAlt,
    children: [],
  },
  {
    id: 12,
    label: "bankDocuments", // Translations key for "Reports"
    path: "/bankDocuments",
    icon: FaFileAlt,
    children: [],
  },
  {
    id: 13,
    label: "userActivity", // Translations key for "User Activity Monitoring"
    path: "/userActivityMonitoring",
    icon: FaUsers,
    children: [],
  },
  {
    id: 23,
    label: "changeLanguage",
    path: "/change-language",
    icon: FaLanguage,
    children: [],
    isLocaleToggle: true,
  },
  {
    id: 14,
    label: "logout", // Translations key for "Logout"
    path: "/logout",
    icon: FaSignOutAlt,
    children: [],
  },
];
