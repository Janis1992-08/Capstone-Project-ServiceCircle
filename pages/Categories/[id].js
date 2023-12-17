import Link from "next/link";
import styled from "styled-components";
import { categories } from "../../lib/data.js";
import { useRouter } from "next/router";
import React from 'react';
import ServiceProvider from "@/components/ServiceCard/index.js";


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

const SubcategoryPage = ({ serviceCards }) => {

  const router = useRouter();
  const { id } = router.query;

  // Find the subcategory based on the ID in the categories
  const foundSubcategory = categories
    .flatMap((category) => category.subcategories)
    .find((sub) => sub.id === id); // Change 'subcategory' to 'id'

  if (!foundSubcategory) {
    return <div>Unterkategorie nicht gefunden</div>;
  }

  const filteredServiceCards = serviceCards.filter(
    (card) => card.subcategory === foundSubcategory.name
  );


  return (
    <>
      <Header>
        <Link href="/">
          <BackLink> &larr;{foundSubcategory.name}</BackLink>
        </Link>
      </Header>

      {filteredServiceCards.map((card) => (
        <ServiceProvider
          key={card.id}
          firstName={card.firstName}
          lastName={card.lastName}
          skills={card.skills}
          needs={card.needs}
          email={card.email}
          phone={card.phone}
        />
      ))}
    </>
  );
};

export default SubcategoryPage;
