import styled from "styled-components";
import React from "react";
import Dislike from "../../assets/ButtonIconDislike.svg?url";
import Like from "../../assets/ButtonIconLike.svg?url";
import Image from "next/image";

const FavButton = styled.button`
  background-color: none;
  border: 0;
  border-radius: 25px;
  padding: 5px 10px;
`;

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <FavButton type="button" onClick={onClick}>
      <Image
        src={isFavorite ? Dislike : Like}
        alt="Favorite Button"
        width={20}
        height={20}
      />
    </FavButton>
  );
}
