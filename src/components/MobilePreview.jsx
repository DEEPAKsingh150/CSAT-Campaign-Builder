import React, { useState, useEffect } from 'react'
import { useCampaign } from '../context/CampaignContext'
import RatingStars from './RatingStars'
import RatingNumbers from './RatingNumbers'

const MobilePreview = () => {
  const { state } = useCampaign()
  const { content, styling } = state

  const [currentStep, setCurrentStep] = useState('initial')
  const [ratingValue, setRatingValue] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [comment, setComment] = useState('')

  const {
    backgroundColor,
    titleColor,
    subtitleColor,
    buttonColor,
    buttonTextColor,
    fontSize,
    fontWeight,
    borderRadius,
    buttonWidth,
    buttonHeight,
    ratingSelectedColor,
    ratingUnselectedColor,
  } = styling

  const { initial, feedback, thankYou } = content

  const handleSubmit = () => {
    if (currentStep === 'initial') {
      setCurrentStep('feedback')
    } else if (currentStep === 'feedback') {
      setCurrentStep('thankyou')
    } else {
      setCurrentStep('initial')
      setRatingValue(0)
      setSelectedOption(null)
      setComment('')
    }
  }

  const handleReset = () => {
    setCurrentStep('initial')
    setRatingValue(0)
    setSelectedOption(null)
    setComment('')
  }

  useEffect(() => {
    if (currentStep === 'initial' && ratingValue > 0) {
      const timer = setTimeout(() => setCurrentStep('feedback'), 400)
      return () => clearTimeout(timer)
    }
  }, [ratingValue, currentStep])

  const renderStep = () => {
    if (currentStep === 'initial') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-2">
          {thankYou.mediaPreview && (
            <img
              src={thankYou.mediaPreview}
              alt="Media"
              className="w-20 h-20 object-contain rounded-xl mb-4"
            />
          )}
          <h2
            style={{
              color: titleColor,
              fontSize: `${parseInt(fontSize) + 4}px`,
              fontWeight: parseInt(fontWeight),
              marginBottom: 8,
            }}
          >
            {initial.title}
          </h2>
          <p
            style={{
              color: subtitleColor,
              fontSize: `${parseInt(fontSize) - 1}px`,
              fontWeight: 400,
              marginBottom: 20,
              maxWidth: 280,
            }}
          >
            {initial.subtitle}
          </p>
          {feedback.ratingType === 'stars' ? (
            <RatingStars
              selected={ratingValue}
              onSelect={setRatingValue}
              selectedColor={ratingSelectedColor}
              unselectedColor={ratingUnselectedColor}
              size={36}
            />
          ) : (
            <RatingNumbers
              selected={ratingValue}
              onSelect={setRatingValue}
              selectedColor={ratingSelectedColor}
              unselectedColor={ratingUnselectedColor}
            />
          )}
          <p
            style={{
              color: subtitleColor,
              fontSize: `${parseInt(fontSize) - 3}px`,
              marginTop: 12,
              opacity: 0.6,
            }}
          >
            {ratingValue > 0 ? `You selected ${ratingValue}` : 'Tap a rating above'}
          </p>
        </div>
      )
    }

    if (currentStep === 'feedback') {
      return (
        <div className="flex flex-col h-full px-2">
          <div className="flex-1 overflow-y-auto">
            <h2
              style={{
                  color: titleColor,
                  fontSize: `${parseInt(fontSize) + 2}px`,
                  fontWeight: parseInt(fontWeight),
                  marginBottom: 4,
                }}
            >
              Tell us more
            </h2>
            <p
              style={{
                  color: subtitleColor,
                  fontSize: `${parseInt(fontSize) - 1}px`,
                  marginBottom: 14,
                }}
            >
              How was your experience?
            </p>

            {feedback.options.length > 0 && (
              <div className="option-chips">
                {feedback.options.map((opt) => (
                  <span
                    key={opt}
                    className="chip"
                    style={{
                      background: selectedOption === opt ? buttonColor : '#f9fafb',
                      color: selectedOption === opt ? buttonTextColor : '#374151',
                      borderColor: selectedOption === opt ? buttonColor : '#e5e7eb',
                    }}
                    onClick={() => setSelectedOption(opt)}
                  >
                    {opt}
                  </span>
                ))}
              </div>
            )}

            {feedback.commentToggle && (
              <div className="mt-4">
                <textarea
                  className="w-full p-3 rounded-xl border border-gray-200 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    borderRadius: `${parseInt(borderRadius)}px`,
                    fontSize: `${parseInt(fontSize) - 1}px`,
                  }}
                />
              </div>
            )}
          </div>

          <button
            className="mt-3 w-full font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: buttonColor,
              color: buttonTextColor,
              borderRadius: `${parseInt(borderRadius)}px`,
              fontSize: `${parseInt(fontSize)}px`,
              fontWeight: parseInt(fontWeight),
              width: `${parseInt(buttonWidth)}%`,
              height: `${parseInt(buttonHeight)}px`,
              margin: '0 auto',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleSubmit}
          >
            {feedback.submitButtonText}
          </button>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-2">
        {thankYou.mediaPreview && (
          <img
            src={thankYou.mediaPreview}
            alt="Thank you"
            className="w-28 h-28 object-contain rounded-2xl mb-4"
          />
        )}
        <h2
          style={{
            color: titleColor,
            fontSize: `${parseInt(fontSize) + 6}px`,
            fontWeight: parseInt(fontWeight),
            marginBottom: 6,
          }}
        >
          {thankYou.title}
        </h2>
        <p
          style={{
            color: subtitleColor,
            fontSize: `${parseInt(fontSize) - 1}px`,
            fontWeight: 400,
            marginBottom: 20,
            maxWidth: 280,
          }}
        >
          {thankYou.subtitle}
        </p>
        <button
          className="font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            backgroundColor: buttonColor,
            color: buttonTextColor,
            borderRadius: `${parseInt(borderRadius)}px`,
            fontSize: `${parseInt(fontSize)}px`,
            fontWeight: parseInt(fontWeight),
            width: `${parseInt(buttonWidth)}%`,
            height: `${parseInt(buttonHeight)}px`,
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleReset}
        >
          {thankYou.buttonText}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="phone-frame">
        <div
          className="phone-screen"
          style={{ background: backgroundColor }}
        >
          <div className="preview-content" style={{ background: backgroundColor }}>
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobilePreview
