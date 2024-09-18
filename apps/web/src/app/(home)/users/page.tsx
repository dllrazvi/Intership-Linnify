import { z } from 'zod';

import { EmployeesProvider } from '@app/features/employees/components/employees-context';
import EmployeesSearchBar from '@app/features/employees/components/employees-searchbar';
import EmployeesTable from '@app/features/employees/components/employees-table';
import { getAllUsers } from '@app/features/user/services/user.service';

export default async function Page({
  searchParams
}: {
  searchParams: { search?: string; sort?: string };
}) {
  const users = await getAllUsers();
  const querySchema = z.object({
    search: z.string().optional(),
    sort: z.string().optional()
  });

  const parsedParams = querySchema.safeParse(searchParams);

  const { search = '', sort = 'name' } = parsedParams.success ? parsedParams.data : {};

  const filteredCount = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  ).length;

  return (
    <main className="flex min-h-screen flex-col p-8">
      <EmployeesProvider users={users} search={search} sort={sort}>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Users
            <span className="text-primary-500 bg-primary-light ml-2 rounded-full px-3 py-1 text-sm font-bold">
              {filteredCount}
            </span>
          </h1>
          <EmployeesSearchBar />
        </div>
        <EmployeesTable />
      </EmployeesProvider>
    </main>
  );
}
