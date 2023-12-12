import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h1`
  color: #333;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export function ServiceCategorie(){
  return (
    <>
      <Header>
        <Title>Service Circle</Title>
      </Header>

      <main>
        <Description>Find your Perfect Service-Match</Description>

        <div>
          <DetailsButton>
            <summary>
              <Link href="/subcategories">
                Technology & IT 
              </Link>
            </summary>
          </DetailsButton>

          <DetailsButton>
            <summary>
              <Link href="/subcategories">
                Home Service
              </Link>
            </summary>
          </DetailsButton>

          <DetailsButton>
            <summary>
              <Link href="/subcategories">
                Language Exchange
              </Link>
            </summary>
          </DetailsButton>
        </div>
      </main>
    </>
  );
};
