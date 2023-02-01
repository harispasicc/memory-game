import cover from "../assets/images/cover/cover.jpg";

function Card({
  columns,
  card,
  moves,
  setMoves,
  handleCardClick,
  isflipped,
  disabled,
}) {
  const cardClick = () => {
    if (!disabled) {
      handleCardClick(card);
    }
    setMoves(moves + 1);
  };
  return (
    <div className="card">
      <div className={isflipped ? "isflipped" : ""}>
        <img
          id={`size-card-front-${columns}`}
          className="front-card"
          alt={"front"}
          src={card.src}
        />
        <img
          id={`size-card-back-${columns}`}
          onClick={cardClick}
          className="back-card"
          alt={"back"}
          src={cover}
        />
      </div>
    </div>
  );
}
export default Card;
