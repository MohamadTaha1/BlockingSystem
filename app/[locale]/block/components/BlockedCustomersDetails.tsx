"use client";
import React, { useState } from "react";
import { useCustomerContext } from "../contexts/CustomerContext";
import blockedAccountsData from "@/app/data/blockedAccounts";
import { useTranslations } from "next-intl";

const BlockedCustomerDetails = () => {
  const t = useTranslations("blocking");
  const { selectedCustomerId } = useCustomerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customer = blockedAccountsData.find(
    (cust) => cust.id === selectedCustomerId
  );

  if (!customer) {
    return <div className="p-4 text-gray-600">{t("noCustomerSelected")}</div>;
  }

  const handleUnblockClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmUnblock = () => {
    console.log(`Unblocking customer with ID: ${customer.id}`);
    setIsModalOpen(false);
  };

  const handleCancelUnblock = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto mt-8">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        {t("customerDetails")}
      </h2>

      {/* Customer Details Grid */}
      <div className="grid grid-cols-2 gap-6 text-lg text-gray-800 mb-8 border border-gray-300 p-6 rounded-lg">
        <p>
          <strong>{t("name")}:</strong> {customer.name}
        </p>
        <p>
          <strong>{t("reason")}:</strong> {customer.reason}
        </p>
        <p>
          <strong>{t("blockDate")}:</strong> {customer.blockDate}
        </p>
        <p>
          <strong>{t("status")}:</strong> {customer.blockStatus}
        </p>
        <p>
          <strong>{t("source")}:</strong> {customer.source}
        </p>
        <p>
          <strong>{t("blockedBy")}:</strong> {customer.blockedBy}
        </p>
        {customer.unblockedBy && (
          <p>
            <strong>{t("unblockedBy")}:</strong> {customer.unblockedBy}
          </p>
        )}
      </div>

      {/* Previous Actions Section */}
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">
        {t("previousActions")}
      </h3>
      {customer.previousActions?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 text-lg">
                <th className="p-4 border border-gray-200">
                  {t("status")}
                </th>
                <th className="p-4 border border-gray-200">{t("blockDate")}</th>
                <th className="p-4 border border-gray-200">{t("reason")}</th>
                <th className="p-4 border border-gray-200">{t("source")}</th>
              </tr>
            </thead>
            <tbody>
              {customer.previousActions.map((action, index) => (
                <tr
                  key={index}
                  className="text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <td className="p-4 border border-gray-200 font-semibold">
                    {t(action.type)}
                  </td>
                  <td className="p-4 border border-gray-200">{action.date}</td>
                  <td className="p-4 border border-gray-200">
                    {action.reason}
                  </td>
                  <td className="p-4 border border-gray-200">
                    {action.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4 text-center">
          {t("noPreviousActions")}
        </p>
      )}

      {/* Unblock Button */}
      {customer.isBlocked && (
        <div className="text-center mt-10">
          <button
            onClick={handleUnblockClick}
            className="mt-6 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            {t("unblock")}
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {t("unblockConfirmation")}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t("confirmUnblockMessage", { name: customer.name })}
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleConfirmUnblock}
                className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-all"
              >
                {t("confirm")}
              </button>
              <button
                onClick={handleCancelUnblock}
                className="px-6 py-3 bg-gray-400 text-white text-lg rounded-lg hover:bg-gray-500 transition-all"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockedCustomerDetails;
