"use client";

import React from "react";
import { useTranslations } from "next-intl";
import CrudDataGrid from "@/app/components/CrudDataGrid/CrudDataGrid";
import { FaTrash, FaEdit, FaDownload } from "react-icons/fa";

const DocumentTable = ({
  documents,
  onDownload,
  onDelete,
  onEdit,
}: {
  documents: {
    id: number;
    title: string;
    details: string;
    attachment: boolean;
  }[];
  onDownload: (document: { id: number; title: string }) => void;
  onDelete: (id: number) => void;
  onEdit: (document: {
    id: number;
    title: string;
    details: string;
    attachment: boolean;
  }) => void;
}) => {
  const t = useTranslations("documents");

  const columns = [
    { key: "title", label: t("title") },
    { key: "details", label: t("details") },
    { key: "attachment", label: t("attachment") },
    { key: "actions", label: t("actions") },
  ];

  const formattedData = documents.map((doc) => ({
    ...doc,
    attachment: doc.attachment ? (
      <button
        onClick={() => onDownload(doc)}
        className="text-blue-600 hover:underline"
      >
        <FaDownload className="inline-block mr-1" /> {t("downloadAttachment")}
      </button>
    ) : (
      <span className="text-gray-400">{t("noAttachment")}</span>
    ),
    actions: (
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(doc)}
          className="text-blue-500 hover:text-blue-700 px-2"
        
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(doc.id)}
          className="text-red-500 hover:text-red-700 px-2"
          
        >
          <FaTrash />
        </button>
      </div>
    ),
  }));

  return (
    <CrudDataGrid
      data={formattedData}
      columns={columns}
      showSearchBar={true}
      onSearch={
        (value) => console.log("Search value:", value) // Add search logic if required
      }
      onDropdownSelect={
        (value) => console.log("Dropdown selected:", value) // Add dropdown filter logic if required
      }
      dropdownOptions={[t("filterAll")]} // Example, adjust as needed
      showActions={false} // Actions are already handled in the table rows
    />
  );
};

export default DocumentTable;
