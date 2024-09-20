'use client';

import { useEmployees } from '@app/employees/context/employees.context';

const EmployeesCount = () => {
  const { filteredCount } = useEmployees();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Users</h1>
      <span className="text-primary-500 bg-primary-light ml-6 rounded-full px-3 py-1 text-sm font-bold">
        {filteredCount}
      </span>
    </div>
  );
};

export default EmployeesCount;
