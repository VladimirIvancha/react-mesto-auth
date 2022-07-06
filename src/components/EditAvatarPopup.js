import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, memo } from "react";

function EditAvatarPopup({
  onClose,
  isOpen,
  onUpdateAvatar,
  isSubmitInLoading,
  isSubmitSuccess,
}) {
  const [userAvatar, setUserAvatar] = useState("");
  const [errorInputAvatar, setErrorInputAvatar] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [isUserUseInputAvatar, setIsUserUseInputAvatar] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setIsUserUseInputAvatar(false);
    setUserAvatar('');
  }, [isOpen]);

  useEffect(() => {
    if (isSubmitSuccess) {
      setUserAvatar("");
    }
  }, [isSubmitSuccess]);

  useEffect(() => {
    setCanSubmit(errorInputAvatar.isValid);
  }, [errorInputAvatar]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(userAvatar);
    setIsUserUseInputAvatar(false);
  }

  function handleOnChangeInputAvatar(e) {
    setUserAvatar(e.target.value);
    setIsUserUseInputAvatar(true);
    setErrorInputAvatar({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-form"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      canSubmit={canSubmit}
      isSubmitInLoading={isSubmitInLoading}
      buttonText="Сохранить"
      buttonTextInLoading="Сохранение..."
    >
      <input
        value={userAvatar}
        type="url"
        className="form__item"
        name="avatar-link"
        placeholder="Ссылка на новый аватар"
        required
        onChange={handleOnChangeInputAvatar}
      />
      <span
        className={`form__input-error${
          !errorInputAvatar.isValid ? " form__input-error_active" : ""
        }`}
        id="avatar-link-error"
      >
        {isUserUseInputAvatar ? errorInputAvatar.errorMessage : ""}
      </span>
    </PopupWithForm>
  );
}

export default memo(EditAvatarPopup);
