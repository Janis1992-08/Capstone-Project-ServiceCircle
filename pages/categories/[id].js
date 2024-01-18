import Link from "next/link";
import styled from "styled-components";
import { categories } from "../../lib/data.js";
import { useRouter } from "next/router";
import { useState } from "react";
import ServiceProvider from "@/components/ServiceProvider/index.js";
import FavoriteButton from "@/components/FavoriteButton/index.js";
import useSWR from "swr";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/Map/index.js"), {
  ssr: false,
});

const StyledInput = styled.input`
  width: 20%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

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
  margin: 10px;
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
        (provider.skills &&
          provider.skills.toLowerCase().includes(filterValue.toLowerCase())) ||
        (provider.needs &&
          provider.needs.toLowerCase().includes(filterValue.toLowerCase())) ||
        (provider.city &&
          provider.city.toLowerCase().includes(filterValue.toLowerCase())) ||
        (provider.district &&
          provider.district.toLowerCase().includes(filterValue.toLowerCase()))
      );
    }
    return (
      provider[filterType] &&
      provider[filterType].toLowerCase().includes(filterValue.toLowerCase())
    );
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
          <FilterLabel>Filter by:</FilterLabel>
          <FilterLabel>
            <select
              value={filterType}
              onChange={(event) => handleFilterTypeChange(event.target.value)}
            >
              <option value="all"> All</option>
              <option value="skills">Skills</option>
              <option value="needs">Needs</option>
              <option value="city">City</option>
              <option value="district">District</option>
            </select>
          </FilterLabel>
          <StyledInput
            type="text"
            placeholder={`Enter ${
              filterType === "all"
                ? "skills, needs, city or district"
                : filterType.toLowerCase()
            }...`}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
        </FilterControls>
      </Header>

      <div style={{ height: "100vh", width: "100%" }}>
        <DynamicMap card={filteredProviders} />
      </div>

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
