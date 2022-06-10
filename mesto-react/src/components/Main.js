import React from 'react';
import Card from "./Card";
import { api } from "../utils/api";

function Main(props)

{

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)
        setCards(cards)
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div 
            className="profile__avatar"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
          <div className="profile__info">
            <div className="profile__title-wrapper">
              <div className="profile__text">
                <h1 className="profile__title">{userName}</h1>
                <p className="profile__subtitle">{userDescription}</p>
              </div>
              <button 
                type="button" aria-label="редактировать" 
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
             </div>
           </div>
        </div>
        <button 
          type="button" 
          aria-label="добавить" 
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <div className="elements">
      {cards.map((card) =>
          <Card key={card._id}
          card={card}
          onCardClick={props.onCardClick}
        />)
        }
      </div>
    </main>
  );
}
  
export default Main;