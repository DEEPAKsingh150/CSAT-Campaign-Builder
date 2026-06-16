import React from 'react'

const RatingNumbers = ({
  selected,
  onSelect,
  selectedColor,
  unselectedColor,
}) => {
  return (
    <div className="number-rating">
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          key={num}
          className="num"
          style={{
            background: selected === num ? selectedColor : '#fff',
            borderColor: selected === num ? selectedColor : '#e5e7eb',
            color: selected === num ? '#fff' : '#374151',
          }}
          onClick={() => onSelect(num)}
        >
          {num}
        </div>
      ))}
    </div>
  )
}

export default RatingNumbers
