import styled from "styled-components";
import Image from "next/image";

const Button = styled.button`
  background-color: #b9bdbd;
  border: 0;
  border-radius: 25px;
  padding: 12px;
`;

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <Image
        src={
          isFavorite
            ? "/assets/ButtonIconDislike.svg"
            : "/assets/ButtonIconLike.svg"
        }
        alt="Favorite Button"
        width={20}
        height={20}
      />
    </Button>
  );
}
