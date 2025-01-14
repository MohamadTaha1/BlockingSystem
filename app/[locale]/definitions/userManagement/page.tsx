'use client';

import React, { useState } from 'react';
import CrudDataGrid from '@/app/components/CrudDataGrid/CrudDataGrid';
import usersData from '@/app/data/users';
import { useTranslations } from 'next-intl';
import { FaEdit, FaTrash } from 'react-icons/fa';



const UserManagementPage = () => {
  const t = useTranslations('definitions.users');
  const [users, setUsers] = useState(usersData);

  const columns = [
    { key: 'id', label: t('id') },
    { key: 'name', label: t('name') },
    { key: 'email', label: t('email') },
    { key: 'phone', label: t('phone') },
    { key: 'role', label: t('role') },
    { key: 'branch', label: t('branch') },
    { key: 'status', label: t('status') },
    { key: 'createdAt', label: t('createdAt') },
    { key: 'lastLogin', label: t('lastLogin') },
  ];

  const handleAddUser = () => {
    //note!! Here i should implement the modal when ready 
    const newUser = {
      id: users.length + 1,
      email: 'new.user@example.com',
      roleId: 3,
      role: 'Employee',
      firstName: 'New',
      lastName: 'User',
      phone: '123-456-7890',
      branchId: 'BR001',
      branchName: 'Main Branch',
      areaId: 'AR001',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
    };
    setUsers((prev:any) => [...prev, newUser]);
    console.log('User added:', newUser);
  };

  // const handleEditUser = (rowId:number) => {
  //   const userToEdit = users.find((user) => user.id === rowId);
  //   if (!userToEdit) return;

  //   const editedUser = {
  //     ...userToEdit,
  //     firstName: 'Edited',
  //   };

  //   setUsers((prev) => prev.map((user) => (user.id === rowId ? editedUser : user)));
  //   console.log('User edited:', editedUser);
  // };

  // const handleDeleteUser = (rowId:number) => {
  //   setUsers((prev) => prev.filter((user) => user.id !== rowId));
  //   console.log('User deleted:', rowId);
  // };

  const formattedData = users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    role: user.role,
    branch: user.branchName,
    status: user.isActive ? t('active') : t('inactive'),
    createdAt: new Date(user.createdAt).toLocaleDateString('en-US'),
    lastLogin: user.lastLogin
      ? new Date(user.lastLogin).toLocaleDateString('en-US')
      : t('noLogin'),
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Page Header */}
      <header className="text-xl font-semibold">{t('userManagement')}</header>

      {/* User Data Grid */}
      <section>
        <CrudDataGrid
          data={formattedData}
          columns={columns}
          showSearchBar={true}
          onSearch={(value) => console.log('Search value:', value)}
          onDropdownSelect={(value) => console.log('Dropdown selected:', value)}
          dropdownOptions={[
            t('filterOptions.filterAll'),
            t('filterOptions.filterByRole'),
            t('filterOptions.filterByBranch'),
          ]}
          showAddButton={true}
          onAddClick={handleAddUser}
          showActions={true}
          actions={[
            {
              name: 'edit',
              icon: <FaEdit/>,
              tip: t('actions.edit'),
              // onClick: (row) => handleEditUser(row.id),
            },
            {
              name: 'delete',
              icon: <FaTrash />,
              tip: t('actions.delete'),
              // onClick: (row) => handleDeleteUser(row.id),
            },
          ]}
        />
      </section>
    </div>
  );
};

export default UserManagementPage;