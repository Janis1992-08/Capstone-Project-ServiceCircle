import Link from "next/link";
import styled from "styled-components";
import { categories } from "../../lib/data.js";
import { useRouter } from "next/router";
import { useState } from "react";
import ServiceProvider from "@/components/ServiceProvider/index.js";
import FavoriteButton from "@/components/FavoriteButton/index.js";
import Map from "@/components/Map/index.js";


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
  color: black;
`;


  const SubcategoryPage = ({ serviceCards, setServiceCards, favorites, onToggleFavorite, handleEditServiceCard }) => {
    const [filterType, setFilterType] = useState("all");
    const [filterValue, setFilterValue] = useState("");
    const [filterCity, setFilterCity] = useState("");
    const [filterDistrict, setFilterDistrict] = useState("");
  
    const router = useRouter();
    const { id } = router.query;
  
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
  
    const filteredServiceCards = serviceCards.filter((card) => {
      const matchesCategory = card.subcategory === foundSubcategory.name;
      const matchesCity = filterCity === "" || card.city?.toLowerCase().includes(filterCity.toLowerCase());
      const matchesDistrict = filterDistrict === "" || card.district?.toLowerCase().includes(filterDistrict.toLowerCase());
    
      if (filterType === "all") {
        return matchesCategory &&
               matchesCity &&
               matchesDistrict &&
               (filterValue === "" || 
                card.skills.toLowerCase().includes(filterValue.toLowerCase()) ||
                card.needs.toLowerCase().includes(filterValue.toLowerCase()) ||
                card.city.toLowerCase().includes(filterValue.toLowerCase()) ||
                card.district.toLowerCase().includes(filterValue.toLowerCase()));
      }
    
      return matchesCategory && 
             (filterType === "city" ? matchesCity : matchesDistrict) &&
             card[filterType]?.toLowerCase().includes(filterValue.toLowerCase());
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
              <option value="city"> City</option>
              <option value="district"> District</option>
            </select>
          </FilterLabel>
          <input
            type="text"
            placeholder={`Enter ${
              filterType === "all"
                ? "skills or needs or city or district"
                : filterType.toLowerCase()
            }...`}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
        </FilterControls>
      </Header>

      <Map/>
      <main>
  <CardWrapper>
    {filteredServiceCards.map((card) => (
      <Card key={card.id}>
        <FavoriteButton
          onClick={() => onToggleFavorite(card.id)}
          isFavorite={favorites.includes(card.id)}
        />
        <ServiceProvider
           key={card.id}
           card={card}
           serviceCards={serviceCards}
           setServiceCards={setServiceCards}
           handleEditServiceCard={handleEditServiceCard}
        />
      </Card>
    ))}
  </CardWrapper>
</main>
    </>
  );
};

export default SubcategoryPage;
