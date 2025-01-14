'use client';

import React, { useState } from 'react';
import CrudDataGrid from '@/app/components/CrudDataGrid/CrudDataGrid';
import definitionsData from '@/app/data/definitionsData';
import { useTranslations } from 'next-intl';
import { FaPen, FaTrash } from 'react-icons/fa';

const ReasonsManagementPage = () => {
  const t = useTranslations('definitions');
  const [reasons, setReasons] = useState(definitionsData.reasons);

  const columns = [
    { key: 'id', label: t('reasons.id') },
    { key: 'name', label: t('reasons.name') },
    { key: 'description', label: t('reasons.description') },
  ];

  const handleAddReason = () => {
    const newReason = {
      id: reasons.length + 1,
      nameEN: 'New Reason',
      nameAR: 'سبب جديد',
      descriptionEN: 'Reason description in English.',
      descriptionAR: 'وصف السبب بالعربية.',
    };
    setReasons((prev) => [...prev, newReason]);
    console.log('New Reason Added:', newReason);
  };

  // const handleEditReason = (row:any) => {
  //   const editedReason = {
  //     ...row,
  //     nameEN: `${row.nameEN} (Edited)`,
  //   };
  //   setReasons((prev) =>
  //     prev.map((reason) => (reason.id === row.id ? editedReason : reason))
  //   );
  //   console.log('Reason Edited:', editedReason);
  // };

  // const handleDeleteReason = (reasonId: number) => {
  //   setReasons((prev) => prev.filter((reason) => reason.id !== reasonId));
  //   console.log('Reason Deleted:', reasonId);
  // };

  const formattedData = reasons.map((reason) => ({
    id: reason.id,
    name: t('lang') === 'ar' ? reason.nameAR : reason.nameEN,
    description:
      t('lang') === 'ar' ? reason.descriptionAR : reason.descriptionEN,
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Page Header */}
      <header className="text-xl font-semibold">{t('reasonsManagement')}</header>

      {/* Reasons Data Grid */}
      <section>
        <CrudDataGrid
          data={formattedData}
          columns={columns}
          showSearchBar={true}
          onSearch={(value) => console.log('Search value:', value)}
          onDropdownSelect={(value) => console.log('Dropdown selected:', value)}
          dropdownOptions={[t('filterOptions.filterAll')]}
          showAddButton={true}
          onAddClick={handleAddReason}
          showActions={true}
          actions={[
            {
              name: 'edit',
              icon: <FaPen />,
              tip: t('actions.edit'),
            //   onClick: (row) => handleEditReason(row),
            },
            {
              name: 'delete',
              icon: <FaTrash />,
              tip: t('actions.delete'),
            //   onClick: (row) => handleDeleteReason(row.id),
            },
          ]}
        />
      </section>
    </div>
  );
};

export default ReasonsManagementPage;
