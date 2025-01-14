'use client';

import React from 'react';
import { CustomerProvider } from './contexts/CustomerContext';
import Header from './components/Header';
import BlockedCustomers from './components/BlockedCustomers';
import BlockedCustomerDetails from './components/BlockedCustomersDetails';

const BlockingPage = () => {
  return (
    <CustomerProvider>
      <div className="p-6 bg-gray-100 min-h-screen">
        <Header />
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="col-span-1">
            <BlockedCustomers />
          </div>
          <div className="col-span-1">
            <BlockedCustomerDetails />
          </div>
        </div>
      </div>
    </CustomerProvider>
  );
};

export default BlockingPage;
