import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState } from "react";
import { api } from "../utils/api";
import { useEffect, memo } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    id: "",
  });
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isSubmitInLoading, setIsSubmitInLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: " ", link: " " });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
        setCurrentUser({ name: "Ошибка!", about: "Ошибка!" });
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      });
  }

  function handleCardDelete(card) {
    setIsSubmitInLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки! Что-то пошло не так");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .patchUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .patchUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .postCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function closeAllPopups() {
    setIsOpenEditProfile(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsOpenEditProfile(true);
    setIsSubmitInLoading(false);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setIsSubmitInLoading(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsSubmitInLoading(false);
  }

  function handleTrashButtonClick(card) {
    setIsDeletePlacePopupOpen(true);
    setIsSubmitInLoading(false);
    setSelectedCard(card);
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onTrashClick={handleTrashButtonClick}
          closeAllPopups={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onUpdateAvatar={handleUpdateAvatar}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          cards={cards}
          isOpenEditProfile={isOpenEditProfile}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          isDeletePlacePopupOpen={isDeletePlacePopupOpen}
          isImagePopupOpen={isImagePopupOpen}
          isSubmitInLoading={isSubmitInLoading}
          isSubmitSuccess={isSubmitSuccess}
          selectedCard={selectedCard}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default memo(App);
