import React from 'react'
import { useCampaign } from '../context/CampaignContext'

const StylingPanel = () => {
  const { state, updateStyling } = useCampaign()
  const { styling } = state

  const colorInputs = [
    { key: 'backgroundColor', label: 'Background' },
    { key: 'titleColor', label: 'Title' },
    { key: 'subtitleColor', label: 'Subtitle' },
    { key: 'buttonColor', label: 'Button' },
    { key: 'buttonTextColor', label: 'Button Text' },
    { key: 'ratingSelectedColor', label: 'Rating Selected' },
    { key: 'ratingUnselectedColor', label: 'Rating Unselected' },
  ]

  const rangeInputs = [
    { key: 'fontSize', label: 'Font Size', min: 12, max: 28, step: 1, suffix: 'px' },
    { key: 'fontWeight', label: 'Font Weight', min: 300, max: 900, step: 100, suffix: '' },
    { key: 'borderRadius', label: 'Border Radius', min: 0, max: 40, step: 1, suffix: 'px' },
    { key: 'buttonWidth', label: 'Button Width', min: 60, max: 100, step: 1, suffix: '%' },
    { key: 'buttonHeight', label: 'Button Height', min: 32, max: 64, step: 1, suffix: 'px' },
  ]

  return (
    <div className="space-y-5">
      <div className="section-card">
        <div className="section-title">
          Colors
          <span className="badge">Palette</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {colorInputs.map(({ key, label }) => (
            <div key={key}>
              <label className="form-label text-xs">{label}</label>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  value={styling[key]}
                  onChange={(e) => updateStyling({ [key]: e.target.value })}
                />
                <span className="color-hex text-xs">{styling[key]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">
          Sizing & Shape
          <span className="badge">Dimensions</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {rangeInputs.map(({ key, label, min, max, step, suffix }) => (
            <div key={key}>
              <label className="form-label text-xs flex justify-between">
                <span>{label}</span>
                <span className="text-gray-400 font-mono">
                  {styling[key]}
                  {suffix}
                </span>
              </label>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={styling[key]}
                onChange={(e) => updateStyling({ [key]: e.target.value })}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StylingPanel
