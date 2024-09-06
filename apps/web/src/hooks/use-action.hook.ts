import { useState, useTransition } from 'react';

export function useActionState<
  Params extends any[],
  Action extends (...params: Params) => any,
  Data extends Awaited<ReturnType<Action>>
>(
  action: Action
): readonly [
  (
    ...params: Parameters<Action>
  ) => Promise<{ data: Data; error: undefined } | { data: undefined; error: Error }>,
  {
    readonly loading: boolean;
    readonly error: unknown;
    readonly data: Data | undefined;
  }
] {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Data>();

  const run = (...p: any) => {
    return new Promise<{ data: Data; error: undefined } | { data: undefined; error: Error }>(
      (resolve) => {
        startTransition(async () => {
          try {
            setError(undefined);
            const data = await action(...p);
            resolve({ data, error: undefined });
            setData(data);
          } catch (error) {
            setError(error as Error);
            setData(undefined);
            resolve({ error: error as Error, data: undefined });
          }
        });
      }
    );
  };

  return [run, { loading, error, data }];
}
