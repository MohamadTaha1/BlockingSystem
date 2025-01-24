"use client";

import React, { useState } from "react";
import DocumentModal from "@/app/components/DocumentsModal";
import DocumentTable from "@/app/components/DocumentsTable";
import { useTranslations } from "next-intl";

const DocumentsPage = () => {
  const t = useTranslations("documents");

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: t("sampleDocument1"),
      details: t("sampleDetails1"),
      attachment: true,
    },
    {
      id: 2,
      title: t("sampleDocument2"),
      details: t("sampleDetails2"),
      attachment: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDocument, setEditDocument] = useState<{
    id: number;
    title: string;
    details: string;
    attachment: boolean;
  } | null>(null);

  const handleAddOrEditDocument = (newDocument: {
    id: number;
    title: string;
    details: string;
    attachment: boolean;
  }) => {
    setDocuments((prev) =>
      editDocument
        ? prev.map((doc) =>
            doc.id === newDocument.id ? { ...newDocument } : doc
          )
        : [...prev, newDocument]
    );
    setEditDocument(null); // Clear the edit state after saving
  };

  const handleDownload = (document: { id: number; title: string }) => {
    alert(t("downloading", { title: document.title }));
  };

  const handleDelete = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleEdit = (document: {
    id: number;
    title: string;
    details: string;
    attachment: boolean;
  }) => {
    setEditDocument(document); // Set the document to be edited
    setIsModalOpen(true); // Open the modal for editing
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-cairo">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">{t("headerTitle")}</h1>
        <button
          onClick={() => {
            setEditDocument(null); // Clear the edit state for a new document
            setIsModalOpen(true);
          }}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {t("addDocument")}
        </button>
      </header>

      {/* Document Table */}
      <DocumentTable
        documents={documents}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Modal */}
      {isModalOpen && (
        <DocumentModal
          onClose={() => {
            setIsModalOpen(false);
            setEditDocument(null); // Clear the edit state on modal close
          }}
          onSave={handleAddOrEditDocument}
          editDocument={editDocument} // Pass the document to be edited
        />
      )}
    </div>
  );
};

export default DocumentsPage;
