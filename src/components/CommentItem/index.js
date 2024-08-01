import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onChangeLike, onDeleteComment} = props
  const {id, name, comment, isLiked, time, bgColor} = commentDetails
  const className = isLiked ? 'liked' : ''
  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const like = () => {
    onChangeLike(id)
  }

  const deleteComment = () => {
    onDeleteComment(id)
  }

  return (
    <li className="list-item">
      <div className="profile-container">
        <p className={`profile ${bgColor}`}>{name[0]}</p>
        <div className="text-container">
          <div className="name-container">
            <h1 className="profile-name">{name}</h1>
            <p className="time">{formatDistanceToNow(time)}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <button type="button" className="like-button" onClick={like}>
          <img src={imgUrl} alt="like" className="like" />
          <p className={`like-para ${className}`}>Like</p>
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={deleteComment}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
