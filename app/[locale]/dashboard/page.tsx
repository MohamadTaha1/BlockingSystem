"use client";

import React, { useState } from "react";
import CrudDataGrid from "@/app/components/CrudDataGrid/CrudDataGrid";
import { useTranslations } from "next-intl";
import overviewData from "@/app/data/overviewData";
import transactionData from "@/app/data/transactions";
import blockedAccountsData from "@/app/data/blockedAccounts";

const DashboardPage = () => {
  const t = useTranslations("dashboard");

  const [activeTab, setActiveTab] = useState<
    "transactions" | "blockedAccounts"
  >("transactions");

  const transactionColumns = [
    { key: "id", label: t("transactionId") },
    { key: "date", label: t("date") },
    { key: "amount", label: t("amount") },
    { key: "accountId", label: t("accountId") },
    { key: "name", label: t("name") },
    { key: "branch", label: t("branch") },
  ];

  const blockedAccountsColumns = [
    { key: "accountId", label: t("accountId") },
    { key: "name", label: t("name") },
    { key: "reason", label: t("reason") },
    { key: "status", label: t("status") },
    { key: "blockDate", label: t("blockDate") },
    { key: "blockedBy", label: t("blockedBy") },
    { key: "approvedBy", label: t("approvedBy") },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Overview Widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">
            {t("blockedAccounts")}
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {overviewData.blockedAccounts}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">
            {t("flaggedTransactions")}
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {" "}
            {overviewData.flaggedTransactions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">
            {t("blockedUsersToday")}
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {" "}
            {overviewData.blockedUsersToday}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">
            {t("highValueTransactions")}
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {overviewData.highValueTransactions}
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section>
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 ${
              activeTab === "transactions"
                ? "border-b-2  text-primary font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            {t("transactionSummary")}
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "blockedAccounts"
                ? "border-b-2  text-primary font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("blockedAccounts")}
          >
            {t("blockedAccountsSummary")}
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "transactions" && (
            <CrudDataGrid
              data={transactionData}
              columns={transactionColumns}
              showSearchBar={true}
              onSearch={(value) => console.log("Search value:", value)}
              onDropdownSelect={(value) =>
                console.log("Dropdown selected:", value)
              }
              dropdownOptions={[t("filterAll"), t("filterAboveLimit")]}
              showActions={false}
            />
          )}

          {activeTab === "blockedAccounts" && (
            <CrudDataGrid
              data={blockedAccountsData}
              columns={blockedAccountsColumns}
              showSearchBar={true}
              onSearch={(value) => console.log("Search value:", value)}
              onDropdownSelect={(value) =>
                console.log("Dropdown selected:", value)
              }
              dropdownOptions={[t("filterAll"), t("filterConfirmed")]}
              showActions={false}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
