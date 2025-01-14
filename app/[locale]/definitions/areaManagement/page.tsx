'use client';

import React, { useState } from 'react';
import CrudDataGrid from '@/app/components/CrudDataGrid/CrudDataGrid';
import definitionsData from '@/app/data/definitionsData';
import { useTranslations } from 'next-intl';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AreaManagementPage = () => {
  const t = useTranslations('definitions');
  const [areas, setAreas] = useState(definitionsData.areas);

  const columns = [
    { key: 'id', label: t('areas.id') },
    { key: 'name', label: t('areas.name') },
    { key: 'branches', label: t('areas.branches') },
  ];

  const handleAddArea = () => {
    const newArea = {
      id: areas.length + 1,
      name: `New Area ${areas.length + 1}`,
      branches: [],
    };
    setAreas((prev) => [...prev, newArea]);
    console.log('New Area Added:', newArea);
  };

  // const handleEditArea = (rowId: number) => {
  //   const areaToEdit = areas.find((area) => area.id === rowId);
  //   if (!areaToEdit) return;

  //   const editedArea = {
  //     ...areaToEdit,
  //     name: `${areaToEdit.name} (Edited)`,
  //   };

  //   setAreas((prev) =>
  //     prev.map((area) => (area.id === rowId ? editedArea : area))
  //   );
  //   console.log('Area Edited:', editedArea);
  // };

  // const handleDeleteArea = (rowId: number) => {
  //   setAreas((prev) => prev.filter((area) => area.id !== rowId));
  //   console.log('Area Deleted:', rowId);
  // };

  const formattedData = areas.map((area) => ({
    id: area.id,
    name: area.name,
    branches: Array.isArray(area.branches)
      ? area.branches.map((branch) => branch.name || branch).join(', ')
      : t('areas.noBranches'),
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Page Header */}
      <header className="text-xl font-semibold">{t('areaManagement')}</header>

      {/* Area Data Grid */}
      <section>
        <CrudDataGrid
          data={formattedData}
          columns={columns}
          showSearchBar={true}
          onSearch={(value) => console.log('Search value:', value)}
          onDropdownSelect={(value) => console.log('Dropdown selected:', value)}
          dropdownOptions={[t('filterOptions.filterAll')]}
          showAddButton={true}
          onAddClick={handleAddArea}
          showActions={true}
          actions={[
            {
              name: 'edit',
              icon: <FaEdit />,
              tip: t('actions.edit'),
            //   onClick: (row) => handleEditArea(row.id as number),
            },
            {
              name: 'delete',
              icon: <FaTrash />,
              tip: t('actions.delete'),
            //   onClick: (row) => handleDeleteArea(row.id as number),
            },
          ]}
        />
      </section>
    </div>
  );
};

export default AreaManagementPage;
