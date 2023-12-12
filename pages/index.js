import Link from 'next/link';
import ServiceCard from './ServiceCard';
import styled from 'styled-components';
import { serviceProviders } from '@/lib/data.js';
import ServiceCategorie from './ServiceCategorie';


const Header = styled.header`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const BackLink = styled.h1`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  width: 300px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;
  

export default function serviceCards() {
  return (
    <>
      <Header>
        <Link href="/subcategories">
            <BackLink>&larr; Web Development</BackLink>
        </Link>
      </Header>

      <main>
        <CardWrapper> 
        {serviceProviders.map(provider => (
          <Card key={provider.id}> 
          <ServiceCard
            firstName={provider.firstName}
            lastName={provider.lastName}
            skills={provider.skills}
            needs={provider.needs}
            email={provider.email}
            phone={provider.phone}
          />
          </Card>
        ))}
        </CardWrapper>
      </main>
    </>
  );
};

