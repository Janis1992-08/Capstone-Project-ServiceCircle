import Link from "next/link";
import ServiceProvider from "../../components/ServiceCards";
import styled from "styled-components";
import { categories } from "../../lib/data.js";
import { useRouter } from "next/router";

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

export default function ServiceCards() {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  const { id } = router.query;

  const subcategory = categories.reduce((foundSubcategory, category) => {
    if (!foundSubcategory) {
      // Check if the category's id matches the provided id
      if (category.id === parseInt(id, 10)) {
        // If found, assign the subcategories array to foundSubcategory
        foundSubcategory = category.subcategories;
      }
    }
    return foundSubcategory;
  }, null);

  if (subcategory && subcategory.name) {
    console.log("Subcategory Name:", subcategory.name);
    // Rest of your code
  } else {
    console.log("Subcategory not found or has no name property");
    return null;
  }

  return (
    <>
      <Header>
        <Link href="/">
          <BackLink> &larr; {subcategory.name}</BackLink>
        </Link>
      </Header>

      <main>
        <CardWrapper>
          {/*  { {serviceProviders.map((provider) => (
            <Card key={provider.id}>
              <ServiceProvider
                firstName={provider.firstName}
                lastName={provider.lastName}
                skills={provider.skills}
                needs={provider.needs}
                email={provider.email}
                phone={provider.phone}
              />}
            </Card>
          ))} */}
        </CardWrapper>
      </main>
    </>
  );
}
