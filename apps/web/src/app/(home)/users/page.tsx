import { z } from 'zod';

import EmployeesCount from '@app/employees/components/employees-count';
import EmployeesSearchBar from '@app/employees/components/employees-searchbar';
import EmployeesTable from '@app/employees/components/employees-table';
import { EmployeesProvider } from '@app/employees/context/employees.context';
import { employeesQuerySchema } from '@app/employees/employeesQuerySchema/employees-query.schema.ts';
import { getAllUsers } from '@app/user/services/user.service';

type PageProps = {
  searchParams: z.infer<typeof employeesQuerySchema>;
};

export default async function Page({ searchParams }: PageProps) {
  const users = await getAllUsers();

  const parsedParams = employeesQuerySchema.safeParse(searchParams);
  if (!parsedParams.success) {
    throw new Error('Invalid search parameters');
  }

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
