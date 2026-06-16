import React, { useState } from 'react'

const RatingStars = ({
  selected,
  onSelect,
  selectedColor,
  unselectedColor,
  size = 32,
}) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="star"
          style={{
            color: star <= (hover || selected) ? selectedColor : unselectedColor,
            fontSize: size,
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onSelect(star)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default RatingStars
