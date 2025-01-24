import React from 'react';
import { useCustomerContext } from '../contexts/CustomerContext';
import CrudDataGrid from '@/app/components/CrudDataGrid/CrudDataGrid';
import blockedAccountsData from '@/app/data/blockedAccounts';
import { useTranslations } from 'next-intl';

const BlockedCustomers = () => {
  const t = useTranslations('unblocking');
  const { setSelectedCustomerId } = useCustomerContext();

  const columns = [
    { key: 'id', label: t('customerId') },
    { key: 'name', label: t('name') },
    { key: 'reason', label: t('reason') },
    { key: 'blockDate', label: t('blockDate') },
    { key: 'status', label: t('status') },
  ];

  const handleRowDoubleClick = (row:any) => {
    setSelectedCustomerId(row.id);
    console.log(`Double-clicked on customer ID: ${row.id}`);
  };

  return (
    <CrudDataGrid
      data={blockedAccountsData}
      columns={columns}
      showSearchBar={true}
      onSearch={(value) => console.log('Search:', value)}
      onDropdownSelect={(value) => console.log('Dropdown Select:', value)}
      dropdownOptions={[t('filterAll'), t('filterBlocked')]}
      showActions={false}
      onRowDoubleClick={handleRowDoubleClick}
    />
  );
};

export default BlockedCustomers;
