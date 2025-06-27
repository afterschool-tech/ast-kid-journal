"use client"

import { Trophy, Star } from "lucide-react"

interface ProgressTrackerProps {
  count: number
  isDarkMode: boolean
}

export default function ProgressTracker({ count, isDarkMode }: ProgressTrackerProps) {
  const getProgressMessage = () => {
    if (count === 0) return "Start your learning journey! 🚀"
    if (count < 3) return `${count} note${count === 1 ? "" : "s"} this week! Keep going! 💪`
    if (count < 5) return `${count} notes this week! You're on fire! 🔥`
    return `${count} notes this week! Learning champion! 🏆`
  }

  const getProgressColor = () => {
    if (count === 0) return "from-gray-400 to-gray-500"
    if (count < 3) return "from-blue-400 to-blue-500"
    if (count < 5) return "from-green-400 to-green-500"
    return "from-yellow-400 to-orange-500"
  }

  return (
    <div className={`px-4 pb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{getProgressMessage()}</span>
        {count >= 5 && <Trophy className="w-5 h-5 text-yellow-600" />}
      </div>

      <div className={`w-full h-3 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-gray-200"} overflow-hidden`}>
        <div
          className={`h-full bg-purple-400 transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${Math.min((count / 7) * 100, 100)}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-1 text-xs opacity-70">
        <span>0</span>
        <span>7 notes/week</span>
      </div>

      {count > 0 && (
        <div className="flex justify-center mt-2">
          {[...Array(Math.min(count, 5))].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-500" />
          ))}
        </div>
      )}
    </div>
  )
}
