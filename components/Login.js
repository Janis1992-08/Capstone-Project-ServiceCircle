import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 15px;
  background-color: #ff4a11;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 12px;
  margin-right: 5px;
  cursor: pointer;
`;

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Button onClick={() => signOut()}>Sign out</Button>
        <h5 className="login">Welcome {session.user.name}</h5>
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
      <h5 className="login">Sign in to make a Service offer</h5>
    </>
  );
}
