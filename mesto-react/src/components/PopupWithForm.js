function PopupWithForm(
  {
    name,
    title,
    buttonText='Сохранить (временно)',
    isOpen,
    onClose,
    children
  })
{
  const classNamePopup = `popup ${name}-popup ${isOpen ? 'popup_is-opened' : ''}`

  return (
    <section
      className={classNamePopup}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="закрыть"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_${name}`} noValidate>
          <fieldset className="form__edit">
            {children}
            <button
              type="submit"
              className="popup__save-info"
            >{buttonText}
            </button>
          </fieldset>
        </form>
        
      </div>
    </section>
  );
}

export default PopupWithForm;
