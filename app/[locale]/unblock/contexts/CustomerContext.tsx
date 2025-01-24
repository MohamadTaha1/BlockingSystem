import React, { createContext, useState, useContext } from 'react';

type CustomerContextType = {
  selectedCustomerId: number | null;
  setSelectedCustomerId: React.Dispatch<React.SetStateAction<number | null>>;
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  return (
    <CustomerContext.Provider value={{ selectedCustomerId, setSelectedCustomerId }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};
