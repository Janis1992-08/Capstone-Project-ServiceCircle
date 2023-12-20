import Link from "next/link";
import styled from "styled-components";
import { categories } from "../../lib/data.js";
import { useRouter } from "next/router";
import { useState } from "react";
import ServiceProvider from "@/components/ServiceCard/index.js";
import FavoriteButton from "@/components/FavoriteButton/index.js";

const Header = styled.header`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Headline = styled.h1`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const CardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.li`
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterControls = styled.div`
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
`;

const FilterInput = styled.input``;

const SubcategoryPage = ({ serviceCards, favorites, onToggleFavorite }) => {
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const router = useRouter();
  const { id } = router.query;

  // Find the subcategory based on the ID in the categories
  const foundSubcategory = categories
    .flatMap((category) => category.subcategories)
    .find((sub) => sub.id === id);

  if (!foundSubcategory) {
    return <div>Unterkategorie nicht gefunden</div>;
  }

  const handleFilterTypeChange = (newFilterType) => {
    setFilterType(newFilterType);
    setFilterValue("");
  };

  const filteredServiceCards = serviceCards.filter(
    (card) => card.subcategory === foundSubcategory.name
  );

  const filteredProviders = filteredServiceCards.filter((provider) => {
    if (filterType === "all") {
      return (
        provider.skills.toLowerCase().includes(filterValue.toLowerCase()) ||
        provider.needs.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return provider[filterType]
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });

  return (
    <>
      <Header>
        <HeaderWrapper>
          <Link href="/">
            <Headline> &larr; {foundSubcategory.name}</Headline>
          </Link>
        </HeaderWrapper>
        <FilterControls>
          <FilterLabel>
            Filter by:
            <select
              value={filterType}
              onChange={(event) => handleFilterTypeChange(event.target.value)}
            >
              <option value="all"> All</option>
              <option value="skills"> Skills</option>
              <option value="needs"> Needs</option>
            </select>
          </FilterLabel>
          <input
            type="text"
            placeholder={`Enter ${
              filterType === "all"
                ? "skills or needs"
                : filterType.toLowerCase()
            }...`}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
        </FilterControls>
      </Header>

      <main>
        <CardWrapper>
          {filteredProviders.map((card) => (
            <Card key={card.id}>
              <FavoriteButton
                onClick={() => onToggleFavorite(card.id)}
                isFavorite={favorites.includes(card.id)}
              />
              <ServiceProvider
                firstName={card.firstName}
                lastName={card.lastName}
                skills={card.skills}
                needs={card.needs}
                email={card.email}
                phone={card.phone}
              />
            </Card>
          ))}
        </CardWrapper>
      </main>
    </>
  );
};

export default SubcategoryPage;
