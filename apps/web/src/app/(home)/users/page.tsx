import { z } from 'zod';

import EmployeesCount from '@app/employees/components/employees-count';
import EmployeesSearchBar from '@app/employees/components/employees-searchbar';
import EmployeesTable from '@app/employees/components/employees-table';
import { EmployeesProvider } from '@app/employees/context/employees.context';
import {
  EmployeesQuery,
  employeesQuery
} from '@app/employees/employeesQuerySchema/employees-query.schema.ts';
import { getAllUsers } from '@app/user/services/user.service';

type PageProps = {
  searchParams: EmployeesQuery;
};

export default async function Page({ searchParams }: PageProps) {
  const users = await getAllUsers();
  const parsedParams = employeesQuery.safeParse(searchParams);
  const { search = '', sort = 'name' } = parsedParams.success ? parsedParams.data : {};
  return (
    <main className="flex min-h-screen flex-col p-8">
      <EmployeesProvider users={users} searchParams={parsedParams.data}>
        <div className="mb-4 flex items-center justify-between">
          <EmployeesCount />
          <EmployeesSearchBar />
        </div>
        <EmployeesTable />
      </EmployeesProvider>
    </main>
  );
}
