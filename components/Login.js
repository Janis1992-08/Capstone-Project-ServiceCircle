import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        <h5>Welcome {session.user.name}</h5>
      </>
    );
  }
  return (
    <>
      <br />
      <button onClick={() => signIn()}>Sign in</button>
      <h5>Sign in to make a Service offer</h5>
    </>
  );
}
