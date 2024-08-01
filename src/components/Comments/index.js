import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onDeleteComment = uid => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachItem => eachItem.id !== uid,
      ),
    }))
  }

  onChangeLike = uid => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === uid) {
          const updatedComment = {...eachItem, isLiked: !eachItem.isLiked}
          return updatedComment
        }
        return eachItem
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {commentsList, name, comment} = this.state
    if (name === '' || comment === '') return
    const time = new Date()
    const bgColor =
      initialContainerBackgroundClassNames[
        commentsList.length % initialContainerBackgroundClassNames.length
      ]
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      time,
      bgColor,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state
    return (
      <div className="bg-container">
        <div className="top-section">
          <h1 className="main-heading">Comments</h1>
          <div className="card-container">
            <form className="comments-form" onSubmit={this.onAddComment}>
              <p className="comments-label">
                Say Something about 4.0 Technologies
              </p>
              <input
                type="text"
                value={name}
                className="form-name"
                placeholder="Your Name"
                onChange={this.onChangeName}
              />
              <textarea
                value={comment}
                className="form-comment"
                placeholder="Your Comment"
                onChange={this.onChangeComment}
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
          <hr className="separator" />
        </div>
        <div className="bottom-section">
          <div className="comment-count-container">
            <p className="count">{commentsList.length}</p>
            <p className="para">Comments</p>
          </div>
          <ul className="comments-container">
            {commentsList.map(eachItem => (
              <CommentItem
                key={eachItem.id}
                commentDetails={eachItem}
                onChangeLike={this.onChangeLike}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
