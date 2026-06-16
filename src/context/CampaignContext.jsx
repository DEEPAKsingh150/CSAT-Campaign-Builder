import React, { createContext, useState, useContext } from 'react'

const CampaignContext = createContext(null)

const defaultState = {
  content: {
    initial: {
      title: 'How satisfied are you?',
      subtitle: 'We value your feedback to improve our service.',
    },
    feedback: {
      ratingType: 'stars',
      options: ['Excellent', 'Good', 'Average', 'Poor'],
      commentToggle: true,
      submitButtonText: 'Submit Feedback',
    },
    thankYou: {
      media: null,
      mediaPreview: null,
      title: 'Thank you! 🎉',
      subtitle: 'Your feedback helps us get better every day.',
      buttonText: 'Done',
    },
  },
  styling: {
    backgroundColor: '#ffffff',
    titleColor: '#111827',
    subtitleColor: '#6b7280',
    buttonColor: '#4f46e5',
    buttonTextColor: '#ffffff',
    fontSize: '16',
    fontWeight: '600',
    borderRadius: '12',
    buttonWidth: '100',
    buttonHeight: '48',
    ratingSelectedColor: '#f59e0b',
    ratingUnselectedColor: '#d1d5db',
  },
}

export const CampaignProvider = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const updateContent = (section, updates) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          ...updates,
        },
      },
    }))
  }

  const updateStyling = (updates) => {
    setState((prev) => ({
      ...prev,
      styling: {
        ...prev.styling,
        ...updates,
      },
    }))
  }

  const addDynamicOption = (option) => {
    if (!option.trim()) return
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        feedback: {
          ...prev.content.feedback,
          options: [...prev.content.feedback.options, option.trim()],
        },
      },
    }))
  }

  const removeDynamicOption = (index) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        feedback: {
          ...prev.content.feedback,
          options: prev.content.feedback.options.filter((_, i) => i !== index),
        },
      },
    }))
  }

  const setMediaFile = (file) => {
    if (!file) {
      setState((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          thankYou: {
            ...prev.content.thankYou,
            media: null,
            mediaPreview: null,
          },
        },
      }))
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setState((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          thankYou: {
            ...prev.content.thankYou,
            media: file,
            mediaPreview: reader.result,
          },
        },
      }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <CampaignContext.Provider
      value={{
        state,
        updateContent,
        updateStyling,
        addDynamicOption,
        removeDynamicOption,
        setMediaFile,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export const useCampaign = () => {
  const ctx = useContext(CampaignContext)
  if (!ctx) throw new Error('useCampaign must be used within CampaignProvider')
  return ctx
}
