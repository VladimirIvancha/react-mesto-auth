import '../index.css';
import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectCard, setSelectCard] = React.useState(null)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectCard(null)
  }

  function onCardClick(card) {
    setSelectCard(card)
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={onCardClick}
        />
        <Footer />
        
        <PopupWithForm
          title="Редактировать профиль"
          name="profile-form"
          onEditProfile=''
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            className="form__item"
            name="name"
            placeholder="Ваше Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className="form__input-error"
            id="profile-name-error"
          ></span>
          <input
            type="text"
            className="form__item"
            name="prophecy"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            className="form__input-error"
            id="profile-prophecy-error"
          ></span>
        </PopupWithForm>

        <PopupWithForm
          name='element-form'
          title='Новое место'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <>
            <input 
              type="text" 
              name="element-name" 
              placeholder="Название"
              className="form__item" 
              minLength="2" 
              maxLength="30" 
              id="element-name"
              required 
            />
            <span 
              className="form__input-error" 
              id="element-name-error"
            ></span>
  
            <input 
              type="url" 
              name="element-link" 
              placeholder="Ссылка на фотографию"
              className="form__item" 
              id="element-link" 
              required 
            />
            <span 
              className="form__input-error" 
              id="element-link-error"
            ></span>
          </>
        </PopupWithForm>

        <PopupWithForm
          name='update-avatar'
          title='Обновить аватар'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <>
            <input 
              type="url" 
              name="avatar-link" 
              placeholder="Ссылка на новый аватар"
              className="form__item" 
              id="avatar" 
              required 
            />
            <span 
            className="form__input-error" 
            id="avatar-link-error"
            ></span>
          </>
        </PopupWithForm>

        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
        />

        <ImagePopup
          card={selectCard}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
