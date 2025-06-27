"use client"

import { Home, BookOpen, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isDarkMode: boolean
}

export default function BottomNav({ activeTab, onTabChange, isDarkMode }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "journal", icon: BookOpen, label: "Journal" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 ${
        isDarkMode ? "bg-slate-800/95" : "bg-white/95"
      } backdrop-blur-sm border-t ${isDarkMode ? "border-slate-700" : "border-purple-200"} z-40`}
    >
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors ${
                isActive
                  ? "bg-purple-400 text-white"
                  : isDarkMode
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
