'use client';

import React, { useState } from 'react';
import CrudDataGrid from '@/app/components/CrudDataGrid/CrudDataGrid';
import definitionsData from '@/app/data/definitionsData';
import { useTranslations } from 'next-intl';
import { FaPen, FaTrash } from 'react-icons/fa';

type Branch = {
  id: number;
  name: string;
  address: string;
  contact: string;
  areaId: number | null;
};

const BranchManagementPage = () => {
  const t = useTranslations('definitions');
  const [branches, setBranches] = useState<Branch[]>(definitionsData.branches);

  const columns = [
    { key: 'id', label: t('branches.id') },
    { key: 'name', label: t('branches.name') },
    { key: 'address', label: t('branches.address') },
    { key: 'contact', label: t('branches.contact') },
    { key: 'area', label: t('branches.area') },
  ];

  const handleAddBranch = () => {
    const newBranch: Branch = {
      id: branches.length + 1,
      name: 'New Branch',
      address: 'New Address',
      contact: '000-000-0000',
      areaId: null,
    };
    setBranches((prev) => [...prev, newBranch]);
    console.log('New Branch Added:', newBranch);
  };

  // const handleEditBranch = (row: Branch) => {
  //   const editedBranch = {
  //     ...row,
  //     name: `${row.name} (Edited)`,
  //   };
  //   setBranches((prev) =>
  //     prev.map((branch) => (branch.id === row.id ? editedBranch : branch))
  //   );
  //   console.log('Branch Edited:', editedBranch);
  // };

  // const handleDeleteBranch = (branchId: number) => {
  //   setBranches((prev) => prev.filter((branch) => branch.id !== branchId));
  //   console.log('Branch Deleted:', branchId);
  // };

  // const handleAssignToArea = (branchId: number, areaId: number) => {
  //   setBranches((prev) =>
  //     prev.map((branch) =>
  //       branch.id === branchId ? { ...branch, areaId } : branch
  //     )
  //   );
  //   console.log(`Branch ${branchId} assigned to Area ${areaId}`);
  // };

  const formattedData = branches.map((branch) => ({
    id: branch.id,
    name: branch.name,
    address: branch.address,
    contact: branch.contact,
    area:
      definitionsData.areas.find((area) => area.id === branch.areaId)?.name ||
      t('branches.unassigned'),
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Page Header */}
      <header className="text-xl font-semibold">{t('branchManagement')}</header>

      {/* Branch Data Grid */}
      <section>
        <CrudDataGrid
          data={formattedData}
          columns={columns}
          showSearchBar={true}
          onSearch={(value) => console.log('Search value:', value)}
          onDropdownSelect={(value) => console.log('Dropdown selected:', value)}
          dropdownOptions={[
            t('filterOptions.filterAll'),
            t('filterOptions.filterByArea'),
          ]}
          showAddButton={true}
          onAddClick={handleAddBranch}
          showActions={true}
          actions={[
            {
              name: 'edit',
              icon: <FaPen />,
              tip: t('actions.edit'),
            //   onClick: (row) => handleEditBranch(row as Branch),
            },
            {
              name: 'delete',
              icon: <FaTrash />,
              tip: t('actions.delete'),
            //   onClick: (row) => handleDeleteBranch((row as Branch).id),
            },
            // {
            //   name: 'assign',
            //   icon: <FaLink />,
            //   tip: t('actions.assignToArea'),
            // //   onClick: (row) =>
            // //     handleAssignToArea((row as Branch).id, 1), // Example: Assign to Area ID 1
            // },
          ]}
        />
      </section>
    </div>
  );
};

export default BranchManagementPage;
