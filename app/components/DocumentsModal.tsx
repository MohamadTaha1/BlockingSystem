"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const DocumentModal = ({
  onClose,
  onSave,
  editDocument,
}: {
  onClose: () => void;
  onSave: (document: {
    id: number;
    title: string;
    details: string;
    attachment: boolean;
  }) => void;
  editDocument?: {
    id: number;
    title: string;
    details: string;
    attachment: boolean;
  } | null;
}) => {
  const t = useTranslations("documents");

  const [title, setTitle] = useState(editDocument?.title || "");
  const [details, setDetails] = useState(editDocument?.details || "");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSave = () => {
    onSave({
      id: editDocument ? editDocument.id : Date.now(),
      title,
      details,
      attachment: attachment !== null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">
            {editDocument ? t("editDocument") : t("addDocument")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </header>

        <form className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("title")}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-info-main"
              placeholder={t("enterTitle")}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("attachment")}
            </label>
            <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              />
              <div className="flex flex-col items-center text-gray-500">
                {attachment ? (
                  <p className="text-sm">{attachment.name}</p>
                ) : (
                  <>
                    <p className="text-sm">{t("chooseFile")}</p>
                    <p className="text-xs text-gray-400">{t("dragDrop")}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("details")}
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-info-main"
              rows={4}
              placeholder={t("enterDetails")}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentModal;
