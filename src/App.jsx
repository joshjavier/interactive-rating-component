import { useState, useRef } from 'react'

import { ReactComponent as StarIcon } from './images/icon-star.svg'
import { ReactComponent as ThankYouImage } from './images/illustration-thank-you.svg'

export default function App() {
  const [rating, setRating] = useState(0)
  const successRef = useRef()

  const handleSelectRating = (event) => {
    setRating(parseInt(event.target.value))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    successRef.current.showModal()
  }

  let scale = 5

  return (
    <main className="wrapper">
      <h1 className="visually-hidden">Interactive rating component</h1>

      <form className="card" onSubmit={handleSubmit}>
        <div className="icon">
          <StarIcon role="img" width="17" height="16" />
        </div>
        <fieldset className="flow">
          <legend>
            <h2>How did we do?</h2>
          </legend>
          <p>
            Please let us know how we did with your support request. All
            feedback is appreciated to help us improve our offering!
          </p>
          <NumberRating
            scale={scale}
            rating={rating}
            onChange={handleSelectRating}
          />
          <button disabled={rating === 0}>Submit</button>
        </fieldset>
      </form>

      <dialog
        ref={successRef}
        role="alertdialog"
        aria-labelledby="success-label"
        aria-describedby="success-description"
        className="[ card ] [ flow text-center ]"
      >
        <RatingSuccess scale={scale} rating={rating}>
          <ThankYouImage
            role="img"
            className="rating-success-image"
            width="162"
            height="108"
          />
          <h2 id="success-label">Thank you!</h2>
          <p id="success-description">
            We appreciate you taking the time to give a rating. If you ever need
            more support, don’t hesitate to get in touch!
          </p>
        </RatingSuccess>
      </dialog>
    </main>
  )
}

function NumberRating({ scale, rating, onChange }) {
  return (
    <div className="rating-group">
      {[...Array(scale)].map((_, i) => (
        <NumberRatingButton
          key={i}
          value={i + 1}
          checked={i + 1 === rating}
          onChange={onChange}
        />
      ))}
    </div>
  )
}

function NumberRatingButton({ value, onChange, checked }) {
  return (
    <label className="rating-button">
      <input
        type="radio"
        name="rating"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{value}</span>
    </label>
  )
}

function RatingSuccess({ scale, rating, children }) {
  const [image, ...content] = children
  return (
    <>
      {image}
      <p className="rating-result">
        You selected {rating} out of {scale}
      </p>
      {content}
    </>
  )
}
