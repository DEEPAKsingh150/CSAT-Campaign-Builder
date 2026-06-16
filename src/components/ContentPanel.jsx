import React, { useState } from 'react'
import { useCampaign } from '../context/CampaignContext'

const ContentPanel = () => {
  const { state, updateContent, addDynamicOption, removeDynamicOption, setMediaFile } = useCampaign()
  const { content } = state
  const [newOption, setNewOption] = useState('')

  const handleAddOption = () => {
    if (newOption.trim()) {
      addDynamicOption(newOption.trim())
      setNewOption('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddOption()
    }
  }

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PNG, JPG, JPEG, or GIF file.')
        return
      }
      setMediaFile(file)
    }
  }

  return (
    <div className="space-y-5">
      <div className="section-card">
        <div className="section-title">
          Initial Feedback
          <span className="badge">Step 1</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={content.initial.title}
              onChange={(e) => updateContent('initial', { title: e.target.value })}
              placeholder="Enter title..."
            />
          </div>
          <div>
            <label className="form-label">Subtitle</label>
            <input
              className="form-input"
              value={content.initial.subtitle}
              onChange={(e) => updateContent('initial', { subtitle: e.target.value })}
              placeholder="Enter subtitle..."
            />
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">
          Feedback Page
          <span className="badge">Step 2</span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="form-label">Rating Type</label>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                onClick={() => updateContent('feedback', { ratingType: 'stars' })}
              >
                ⭐ Stars
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                onClick={() => updateContent('feedback', { ratingType: 'numbers' })}
              >
                🔢 Numbers
              </button>
            </div>
          </div>

          <div>
            <label className="form-label">Dynamic Options</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {content.feedback.options.map((opt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-200"
                >
                  {opt}
                  <button
                    onClick={() => removeDynamicOption(idx)}
                    className="ml-1 text-indigo-400 hover:text-red-500 transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="form-input form-input-sm flex-1"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add an option..."
              />
              <button
                onClick={handleAddOption}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Additional Comment</span>
            <div
              className="toggle-switch"
              onClick={() =>
                updateContent('feedback', {
                  commentToggle: !content.feedback.commentToggle,
                })
              }
            >
              <div className="toggle-knob" />
            </div>
          </div>

          <div>
            <label className="form-label">Submit Button Text</label>
            <input
              className="form-input"
              value={content.feedback.submitButtonText}
              onChange={(e) =>
                updateContent('feedback', { submitButtonText: e.target.value })
              }
              placeholder="Submit..."
            />
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">
          Thank You Page
          <span className="badge">Step 3</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="form-label">Upload Media (PNG, JPG, JPEG, GIF)</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif"
              onChange={handleMediaChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
            {content.thankYou.mediaPreview && (
              <div className="mt-2">
                <img
                  src={content.thankYou.mediaPreview}
                  alt="Thank you media"
                  className="w-full max-h-[120px] object-contain rounded-xl bg-gray-50 border border-dashed border-gray-300 p-2"
                />
                <button
                  onClick={() => setMediaFile(null)}
                  className="mt-1 text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={content.thankYou.title}
              onChange={(e) => updateContent('thankYou', { title: e.target.value })}
              placeholder="Thank you title..."
            />
          </div>
          <div>
            <label className="form-label">Subtitle</label>
            <input
              className="form-input"
              value={content.thankYou.subtitle}
              onChange={(e) => updateContent('thankYou', { subtitle: e.target.value })}
              placeholder="Thank you subtitle..."
            />
          </div>
          <div>
            <label className="form-label">Button Text</label>
            <input
              className="form-input"
              value={content.thankYou.buttonText}
              onChange={(e) => updateContent('thankYou', { buttonText: e.target.value })}
              placeholder="Done..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPanel
