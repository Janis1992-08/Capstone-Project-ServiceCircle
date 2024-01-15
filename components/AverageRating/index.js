import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const AverageRating = ({ card }) => {
  if (!card || !card.rating || card.rating.length === 0) {
    return <p>No Rating yet</p>;
  }

  const averageRating =
    card.rating.reduce((a, b) => a + b, 0) / card.rating.length;
  const filledStars = Math.max(0, Math.floor(averageRating));
  const halfStar = averageRating % 1 >= 0.5;
  const emptyStars = Math.max(
    0,
    Math.floor(5 - filledStars - (halfStar ? 1 : 0))
  );

  return (
    <>
      {Array(filledStars)
        .fill()
        .map((_, i) => (
          <AiFillStar key={i} color="gold" size="1.3em" />
        ))}
      {halfStar ? (
        <AiFillStar
          style={{ clipPath: "inset(0 50% 0 0)" }}
          color="gold"
          size="1.3em"
        />
      ) : (
        ""
      )}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <AiOutlineStar
            key={i + filledStars + (halfStar ? 1 : 0)}
            size="1.3em"
          />
        ))}
    </>
  );
};

export default AverageRating;
