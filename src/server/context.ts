import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = opts?.req.headers.auth;

  return {
    session,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
