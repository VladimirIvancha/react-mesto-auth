function ImagePopup(props) {
  
  const classNamePopup = `popup ${props.card ? 'popup_is-opened' : ''}`

  return (
    <div
      className={classNamePopup}
    >
      <div className="popup__image-container">
        <button
          onClick={props.onClose}
          aria-label="закрыть"
          type="button"
          className="popup__close popup__close_correct"
        ></button>
        <img
            src={props.card ? props.card.link : '#'}
            alt={props.card ? props.card.name : ''}
            className="popup__image"
        />
        <h4 className="popup__image-title">{props.card ? props.card.name : ''}</h4>  
      </div>
    </div>
  );
}

export default ImagePopup;
