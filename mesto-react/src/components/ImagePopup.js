function ImagePopup(
  {
    card,
    onClose
  }) {
  
  const classNamePopup = `popup ${card  && 'popup_is-opened'}`

  return (
    <div
      className={classNamePopup}
    >
      <div className="popup__image-container">
        <button
          onClick={onClose}
          aria-label="закрыть"
          type="button"
          className="popup__close popup__close_correct"
        ></button>
        <img
            src={card?.link}
            alt={card?.name}
            className="popup__image"
        />
        <h4 className="popup__image-title">{card?.name}</h4>  
      </div>
    </div>
  );
}

export default ImagePopup;
