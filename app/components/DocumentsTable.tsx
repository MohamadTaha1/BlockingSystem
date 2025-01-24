import React from "react";
import { useTranslations } from "next-intl";
import { FaTrash, FaEdit } from "react-icons/fa";

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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              {t("title")}
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              {t("details")}
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              {t("attachment")}
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4 text-left">{doc.title}</td>
              <td className="px-6 py-4 text-left">{doc.details}</td>
              <td className="px-6 py-4 text-left">
                {doc.attachment ? (
                  <button
                    onClick={() => onDownload(doc)}
                    className="text-blue-600 hover:underline"
                  >
                    {t("downloadAttachment")}
                  </button>
                ) : (
                  <span className="text-gray-400">{t("noAttachment")}</span>
                )}
              </td>
              <td className="px-6 py-4 text-left">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
