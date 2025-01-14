'use client';

import React, { useState } from 'react';
import CrudDataGrid from '@/app/components/CrudDataGrid/CrudDataGrid';
import definitionsData from '@/app/data/definitionsData';
import { useTranslations } from 'next-intl';
import { FaPen, FaTrash } from 'react-icons/fa';

const SourcesManagementPage = () => {
  const t = useTranslations('definitions');
  const [sources, setSources] = useState(definitionsData.sources);

  const columns = [
    { key: 'id', label: t('sources.id') },
    { key: 'name', label: t('sources.name') },
    { key: 'description', label: t('sources.description') },
  ];

  const handleAddSource = () => {
    const newSource = {
      id: sources.length + 1,
      nameEN: 'New Source',
      nameAR: 'مصدر جديد',
      descriptionEN: 'Source description in English.',
      descriptionAR: 'وصف المصدر بالعربية.',
    };
    setSources((prev) => [...prev, newSource]);
    console.log('New Source Added:', newSource);
  };

  // const handleEditSource = (row:any) => {
  //   const editedSource = {
  //     ...row,
  //     nameEN: `${row.nameEN} (Edited)`,
  //   };
  //   setSources((prev) =>
  //     prev.map((source) => (source.id === row.id ? editedSource : source))
  //   );
  //   console.log('Source Edited:', editedSource);
  // };

  // const handleDeleteSource = (sourceId: number) => {
  //   setSources((prev) => prev.filter((source) => source.id !== sourceId));
  //   console.log('Source Deleted:', sourceId);
  // };

  const formattedData = sources.map((source) => ({
    id: source.id,
    name: t('lang') === 'ar' ? source.nameAR : source.nameEN,
    description:
      t('lang') === 'ar' ? source.descriptionAR : source.descriptionEN,
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Page Header */}
      <header className="text-xl font-semibold">{t('sourcesManagement')}</header>

      {/* Sources Data Grid */}
      <section>
        <CrudDataGrid
          data={formattedData}
          columns={columns}
          showSearchBar={true}
          onSearch={(value) => console.log('Search value:', value)}
          onDropdownSelect={(value) => console.log('Dropdown selected:', value)}
          dropdownOptions={[t('filterOptions.filterAll')]}
          showAddButton={true}
          onAddClick={handleAddSource}
          showActions={true}
          actions={[
            {
              name: 'edit',
              icon: <FaPen />,
              tip: t('actions.edit'),
            //   onClick: (row) => handleEditSource(row),
            },
            {
              name: 'delete',
              icon: <FaTrash />,
              tip: t('actions.delete'),
            //   onClick: (row) => handleDeleteSource(row.id),
            },
          ]}
        />
      </section>
    </div>
  );
};

export default SourcesManagementPage;
