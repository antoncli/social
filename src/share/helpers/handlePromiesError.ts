export const handlePromiseError = async <T extends (...args: any) => any>(
  fn: T,
  params: Parameters<typeof fn>,
  callback: (params: Awaited<ReturnType<typeof fn>>) => void
) => {
  try {
    callback(await fn(...params));
  } catch (error: any) {
    console.log(error?.message);
  }
};
