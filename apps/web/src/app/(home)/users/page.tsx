import { EmployeesProvider } from '@app/features/employees/components/employees-context';
import UsersCount from '@app/features/employees/components/employees-count';
import EmployeesSearchBar from '@app/features/employees/components/employees-searchbar';
import EmployeesTable from '@app/features/employees/components/employees-table';
import { querySchema } from '@app/features/employees/schemas/query-params';
import { getAllUsers } from '@app/features/user/services/user.service';

export default async function Page({
  searchParams
}: {
  searchParams: { search?: string; sort?: string };
}) {
  const users = await getAllUsers();

  const parsedParams = querySchema.parse(searchParams);
  const { search, sort } = parsedParams;

  return (
    <main className="flex min-h-screen flex-col p-8">
      <EmployeesProvider users={users} search={search} sort={sort}>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Users
            <UsersCount />
          </h1>
          <EmployeesSearchBar />
        </div>
        <EmployeesTable />
      </EmployeesProvider>
    </main>
  );
}
