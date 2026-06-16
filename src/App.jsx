import React, { useState } from 'react'
import { CampaignProvider } from './context/CampaignContext'
import ContentPanel from './components/ContentPanel'
import StylingPanel from './components/StylingPanel'
import MobilePreview from './components/MobilePreview'

function App() {
  const [activeTab, setActiveTab] = useState('content')

  return (
    <CampaignProvider>
      <div className="min-h-screen bg-[#f5f7fb]">
        <header className="bg-white border-b border-gray-200/80 sticky top-0 z-30 backdrop-blur-sm bg-white/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200">
                C
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">CSAT Builder</h1>
                <p className="text-xs text-gray-500 font-medium -mt-0.5">Campaign Configuration</p>
              </div>
            </div>
              <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl">
              <button
                className="ab-btn"
                onClick={() => setActiveTab('content')}
              >✏️ Content</button>
              <button
                className="ab-btn"
                onClick={() => setActiveTab('styling')}
              >🎨 Styling</button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 min-h-[600px] max-h-[820px] overflow-y-auto">
                {activeTab === 'content' ? <ContentPanel /> : <StylingPanel />}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-4 min-h-[600px] max-h-[820px] flex items-center justify-center">
                <MobilePreview />
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-gray-400 border-t border-gray-200/60 pt-4">
            <span className="font-medium">CSAT Campaign Builder</span>
            {' • '}Real-time preview • No save required
          </div>
        </main>
      </div>
    </CampaignProvider>
  )
}

export default App
