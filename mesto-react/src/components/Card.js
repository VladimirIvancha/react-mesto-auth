import { useContext, memo } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onTrashClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-icon${
    isLiked ? " element__like-icon-active" : ""
  }`;
  const cardLikesCount = card.likes.length;

  return (
    <article className="element">
      <img
        src={card.link}
        className="element__image"
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
        {isOwn && (
        <button
          className="location__trash-button"
          onClick={() => onTrashClick(card)}
        ></button>
        )}
      <div className="element__wrapper">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-wrapper"> 
              <button 
                type="button" 
                aria-label="лайкнуть" 
                className={cardLikeButtonClassName}
                onClick={() => onCardLike(card)}
              >
                {""}  
              </button>
              <span className="element__like-value">
                {cardLikesCount === 0 ? "" : cardLikesCount}
              </span>
            </div>
      </div>      
    </article>
  );
}

export default memo(Card);
