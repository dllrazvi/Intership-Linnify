'use client';

import { useEmployees } from './employees-context';

const UsersCount = () => {
  const { filteredCount } = useEmployees();

  return (
    <span className="text-primary-500 bg-primary-light ml-2 rounded-full px-3 py-1 text-sm font-bold">
      {filteredCount}
    </span>
  );
};

export default UsersCount;
