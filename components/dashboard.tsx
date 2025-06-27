"use client"

import { useState } from "react"
import type { JournalEntry } from "../app"
import NoteCard from "./note-card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardProps {
  entries: JournalEntry[]
  onEdit: (entry: JournalEntry) => void
  onDelete: (id: string) => void
  isDarkMode: boolean
}

export default function Dashboard({ entries, onEdit, onDelete, isDarkMode }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || entry.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const allTags = [...new Set(entries.flatMap((entry) => entry.tags))]

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-32 h-32 bg-purple-200 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">📚</span>
        </div>
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
          Start Your Learning Journey! 🚀
        </h2>
        <p className={`text-lg mb-6 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
          Tap the + button to add your first learning note!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          />
          <Input
            placeholder="Search your notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 rounded-full border-2 ${
              isDarkMode
                ? "bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                : "bg-white border-purple-200 placeholder-slate-500"
            }`}
          />
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                !selectedTag
                  ? "bg-purple-400 text-white"
                  : isDarkMode
                    ? "bg-slate-600 text-slate-300 hover:bg-slate-500"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-purple-400 text-white"
                    : isDarkMode
                      ? "bg-slate-600 text-slate-300 hover:bg-slate-500"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4">
        {filteredEntries.map((entry, index) => (
          <NoteCard
            key={entry.id}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
            isDarkMode={isDarkMode}
            index={index}
          />
        ))}
      </div>

      {filteredEntries.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className={`text-lg ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            No notes found matching "{searchTerm}" 🔍
          </p>
        </div>
      )}
    </div>
  )
}
