function Card(props) {
  
  function handleClick () {
    props.onCardClick(props.card);
  }  

  return (
    <article className="element">
      <img
        src={props.card.link}
        className="element__image"
        alt={props.card.name}
        onClick={handleClick}
      />
        <button
          type="button"
          aria-label="удалить"
          className="element__delete-button"
        ></button>
      <div className="element__wrapper">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-wrapper"> 
            <button 
              type="button" 
              aria-label="лайкнуть" 
              className="element__like-icon"
            >
            </button>
              <span className="element__like-value">
                {props.card.likes.length}
              </span>
            </div>
      </div>      
    </article>
  );
}

export default Card;
