const blockedCustomersData = [
    {
      id: 1,
      name: 'John Doe',
      branchId: 101,
      areaId: 201,
      email: 'johndoe@example.com',
      phone: '1234567890',
      isBlocked: true,
      blockStatus: 'Active',
      blockDate: '2023-12-20',
      blockedBy: 'Admin User', // Name or ID of the user who blocked
      unblockedBy: null, // Name or ID of the user who unblocked (if applicable)
      duration: 'Permanent', // Duration of the block (Permanent/Temporary)
      reason: 'Fraudulent activity',
      source: 'System Generated', // Where the block originated from
      previousActions: [
        {
          type: 'Block',
          date: '2023-11-01',
          reason: 'Suspicious login',
          source: 'Manual Entry',
          blockedBy: 'Checker User',
        },
        {
          type: 'Unblock',
          date: '2023-11-15',
          reason: 'False alarm',
          unblockedBy: 'Admin User',
        },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      branchId: 102,
      areaId: 202,
      email: 'janesmith@example.com',
      phone: '0987654321',
      isBlocked: true,
      blockStatus: 'Pending Approval',
      blockDate: '2023-12-18',
      blockedBy: 'Checker User',
      unblockedBy: null,
      duration: '30 days',
      reason: 'Non-payment',
      source: 'Manual Entry',
      previousActions: [
        {
          type: 'Block',
          date: '2023-11-20',
          reason: 'Overdue balance',
          source: 'System Generated',
          blockedBy: 'Admin User',
        },
      ],
    },
  ];
  
export default blockedCustomersData;