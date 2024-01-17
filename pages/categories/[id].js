import Link from "next/link";
import styled from "styled-components";
import { categories } from "../../lib/data.js";
import { useRouter } from "next/router";
import { useState } from "react";
import ServiceProvider from "@/components/ServiceProvider/index.js";
import FavoriteButton from "@/components/FavoriteButton/index.js";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const Header = styled.header`
  padding: 20px;
  text-align: center;
`;

const Headline = styled.p`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
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

const SubcategoryPage = ({ fetcher, favorites, onToggleFavorite }) => {
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { isReady } = router;
  const { data } = useSWR("/api/providers", fetcher);
  const { data: session } = useSession();

  if (!data || !isReady) return <div>Loading...</div>;

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

  const filteredServiceCards = data.filter(
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

          
       {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <Card key={provider._id}>
              {session && (

                <FavoriteButton
                  onClick={() => onToggleFavorite(provider._id)}
                  isFavorite={favorites.includes(provider._id)}
                />

              )}


                <ServiceProvider key={provider._id} card={provider} />
              </Card>
            ))
          ) : (
            <div>No cards to display</div>
          )}

        </CardWrapper>
      </main>
    </>
  );
};

export default SubcategoryPage;
