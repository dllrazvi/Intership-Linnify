import EmployeesContainer from '@app/features/employees/components/employees-container';
import { getAllUsers } from '@app/features/user/services/user.service';

export default async function Page() {
  const users = await getAllUsers();

  return (
    <main className="flex min-h-screen flex-col p-8">
      <EmployeesContainer users={users || []} />
    </main>
  );
}
