import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 15px;
  background-color: #ff4a11;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Button onClick={() => signOut()}>Sign out</Button>
        <h5>Welcome {session.user.name}</h5>
      </>
    );
  }
  return (
    <>
      <br />
      <Button onClick={() => signIn()}>Sign in</Button>
      {/* <h5>Sign in to make a Service offer</h5> */}
    </>
  );
}
