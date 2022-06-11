function Card(
  {
    card,
    onCardClick
  }) {
  
  function handleClick () {
    onCardClick(card);
  }  

  return (
    <article className="element">
      <img
        src={card.link}
        className="element__image"
        alt={card.name}
        onClick={handleClick}
      />
        <button
          type="button"
          aria-label="удалить"
          className="element__delete-button"
        ></button>
      <div className="element__wrapper">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-wrapper"> 
            <button 
              type="button" 
              aria-label="лайкнуть" 
              className="element__like-icon"
            >
            </button>
              <span className="element__like-value">
                {card.likes.length}
              </span>
            </div>
      </div>      
    </article>
  );
}

export default Card;
