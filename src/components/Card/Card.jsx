import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Card({ card, onCardClick, onCardLike, onDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_type_active"
    }`
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="element__card">
      {currentUser._id === card.owner._id && (<button type="button" className="element__delete" onClick={() => onDelete(card._id)} />)}
      <img className="element__image" src={card.link} alt={`Изображение ${card.name}`}
        onClick={() => onCardClick(card)}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
