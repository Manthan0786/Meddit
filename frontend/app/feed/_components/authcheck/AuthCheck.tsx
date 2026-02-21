import { auth } from "../../../api/auth/auth";

export async function getSession() {
  const session = await auth();

  return session;
}
