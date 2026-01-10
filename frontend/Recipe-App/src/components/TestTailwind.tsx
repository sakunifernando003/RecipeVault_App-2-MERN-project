import React from 'react'

const TestTailwind = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">Tailwind CSS Test</h1>
      <p className="text-white mb-4">
        If you see this styled box with gradient background, Tailwind is working!
      </p>
      <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
        Test Button
      </button>
    </div>
  )
}

export default TestTailwind