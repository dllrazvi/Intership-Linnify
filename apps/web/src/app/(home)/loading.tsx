import { Skeleton } from '@repo/ui/skeleton';

export default function DashboardNewsLoading() {
  const items = Array.from(Array(8).keys());

  return (
    <div className={'grid grid-cols-4 gap-x-4 gap-y-6'}>
      {items.map((item) => (
        <Skeleton key={item.toString()} className={'h-80 w-full rounded-md'} />
      ))}
    </div>
  );
}
