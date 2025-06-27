"use client"

import { useState } from "react"
import type { JournalEntry } from "../app"
import { Edit, Trash2, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoteCardProps {
  entry: JournalEntry
  onEdit: (entry: JournalEntry) => void
  onDelete: (id: string) => void
  isDarkMode: boolean
  index: number
}

export default function NoteCard({ entry, onEdit, onDelete, isDarkMode, index }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const cardColors = isDarkMode
    ? [
        "bg-slate-600 border-slate-500",
        "bg-purple-800 border-purple-700",
        "bg-blue-800 border-blue-700",
        "bg-green-800 border-green-700",
        "bg-pink-800 border-pink-700",
        "bg-yellow-800 border-yellow-700",
        "bg-orange-800 border-orange-700",
        "bg-indigo-800 border-indigo-700",
      ]
    : [
        "bg-purple-50 border-purple-100",
        "bg-blue-50 border-blue-100",
        "bg-green-50 border-green-100",
        "bg-pink-50 border-pink-100",
        "bg-yellow-50 border-yellow-100",
        "bg-orange-50 border-orange-100",
        "bg-indigo-50 border-indigo-100",
        "bg-rose-50 border-rose-100",
      ]

  const cardColor = cardColors[index % cardColors.length]

  return (
    <div
      className={`${cardColor} rounded-2xl border-2 p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>{entry.title}</h3>
          <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            <Calendar className="w-4 h-4" />
            <span>{formatDate(entry.date)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{entry.emoji}</span>
          <div className="flex gap-1">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(entry)
              }}
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-white/70 rounded-full transition-colors"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(entry.id)
              }}
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Preview */}
      <p
        className={`text-sm mb-3 ${
          isDarkMode ? "text-slate-200" : "text-slate-700"
        } ${!isExpanded ? "line-clamp-2" : ""}`}
      >
        {entry.summary}
      </p>

      {/* Tags */}
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          <Tag className={`w-4 h-4 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isDarkMode ? "bg-slate-600 text-slate-200" : "bg-white/70 text-slate-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Expand Indicator */}
      <div className={`text-center text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
        {isExpanded ? "↑ Tap to collapse" : "↓ Tap to expand"}
      </div>
    </div>
  )
}
