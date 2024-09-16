import EmployeesTable from '@app/features/employees/components/employees-table';
import { getAllUsers } from '@app/features/user/services/user.service';

export default async function Page() {
  const users = await getAllUsers();

  return (
    <main className="flex min-h-screen flex-col p-8">
      <section>
        <h1 className="mb-4 text-2xl font-bold">
          Users
          <span className="text-primary-500 bg-primary-light ml-2 rounded-full px-3 py-1 text-sm font-bold">
            {users.length}
          </span>
        </h1>
        <EmployeesTable users={users} />
      </section>
    </main>
  );
}
