"use client";

import React, { useState } from "react";
import { FaSearch, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import CrudDataGrid from "@/app/components/CrudDataGrid/CrudDataGrid";
import transactionData from "@/app/data/transactions";
import { useTranslations } from "next-intl";

type Transaction = {
  id: number;
  date: string;
  amount: number;
  accountId: string;
  branch: string;
  area: string;
  flagStatus: string;
  reviewerComments?: string;
};

const TransactionsPage = () => {
  const t = useTranslations("transactions");
  const [transactions, setTransactions] =
    useState<Transaction[]>(transactionData);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    action: string | null;
    transaction: Transaction | null;
  }>({
    isOpen: false,
    action: null,
    transaction: null,
  });

  const columns = [
    { key: "id", label: t("transactionId") },
    { key: "date", label: t("dateTime") },
    { key: "amount", label: t("amount") },
    { key: "accountId", label: t("accountId") },
    { key: "branch", label: t("branchName") },
    { key: "area", label: t("areaName") },
    { key: "flagStatus", label: t("flagStatus") },
  ];

  const openModal = (action: string, transaction: Transaction) => {
    setModal({ isOpen: true, action, transaction });
  };

  const closeModal = () => {
    setModal({ isOpen: false, action: null, transaction: null });
  };

  const handleApprove = () => {
    if (!modal.transaction) return;
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === modal.transaction!.id
          ? { ...txn, flagStatus: t("actions.approve") }
          : txn
      )
    );
    closeModal();
  };

  const handleEscalate = () => {
    if (!modal.transaction) return;
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === modal.transaction!.id
          ? { ...txn, flagStatus: t("actions.escalate") }
          : txn
      )
    );
    closeModal();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      <header className="text-2xl font-bold text-primary mb-4">
        {t("transactionList")}
      </header>

      <section>
        <CrudDataGrid
          data={transactions.map((txn) => ({
            id: txn.id,
            date: txn.date,
            amount: txn.amount.toLocaleString(),
            accountId: txn.accountId,
            branch: txn.branch,
            area: txn.area || t("noAreaAssigned"),
            flagStatus: txn.flagStatus || t("unflagged"),
          }))}
          columns={columns}
          showSearchBar={true}
          onSearch={(value) => console.log("Search value:", value)}
          onDropdownSelect={(value) => console.log("Dropdown selected:", value)}
          dropdownOptions={[t("filterAll"), t("filterFlagged")]}
          showActions={true}
          actions={[
            {
              name: "review",
              icon: <FaSearch />,
              tip: t("actions.review"),
              onClick: (row) => openModal("review", row as Transaction),
            },
            {
              name: "approve",
              icon: <FaCheck />,
              tip: t("actions.approve"),
              onClick: (row) => openModal("approve", row as Transaction),
            },
            {
              name: "escalate",
              icon: <FaExclamationTriangle />,
              tip: t("actions.escalate"),
              onClick: (row) => openModal("escalate", row as Transaction),
            },
          ]}
        />
      </section>

      {/* Modal Section */}
      {modal.isOpen && modal.transaction && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-primary">
                {modal.action === "review" && t("actions.review")}
                {modal.action === "approve" && t("actions.approve")}
                {modal.action === "escalate" && t("actions.escalate")}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-red-500 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-200">
              <p className="text-lg">
                <strong>{t("transactionId")}:</strong> {modal.transaction.id}
              </p>
              <p className="text-lg">
                <strong>{t("amount")}:</strong> {modal.transaction.amount}
              </p>
              <p className="text-lg">
                <strong>{t("accountId")}:</strong> {modal.transaction.accountId}
              </p>
              <p className="text-lg">
                <strong>{t("branchName")}:</strong> {modal.transaction.branch}
              </p>
              <p className="text-lg">
                <strong>{t("flagStatus")}:</strong>{" "}
                {modal.transaction.flagStatus}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              {modal.action === "approve" && (
                <button
                  onClick={handleApprove}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
                >
                  {t("actions.approve")}
                </button>
              )}
              {modal.action === "escalate" && (
                <button
                  onClick={handleEscalate}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition-all"
                >
                  {t("actions.escalate")}
                </button>
              )}
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition-all"
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

export default TransactionsPage;
