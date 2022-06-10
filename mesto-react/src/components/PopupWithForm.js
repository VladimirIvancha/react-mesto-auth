function PopupWithForm(props)
{
  const classNamePopup = `popup ${props.name}-popup ${props.isOpen ? 'popup_is-opened' : ''}`

  return (
    <section
      className={classNamePopup}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="закрыть"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form form_${props.name}`} noValidate>
          <fieldset className="form__edit">
            {props.children}
            <button
              type="submit"
              className="popup__save-info"
            >Сохранить
            </button>
          </fieldset>
        </form>
        
      </div>
    </section>
  );
}

export default PopupWithForm;
