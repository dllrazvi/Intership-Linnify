'use client';

import { useEmployees } from '@app/employees/context/employees.context';

const EmployeesCount = () => {
  const { filteredCount } = useEmployees();

  return (
    <span className="text-primary-500 bg-primary-light ml-2 rounded-full px-3 py-1 text-sm font-bold">
      {filteredCount}
    </span>
  );
};

export default EmployeesCount;
