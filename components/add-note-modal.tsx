"use client"

import { useState, useEffect } from "react"
import type { JournalEntry } from "../app"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (entry: any) => void
  editingEntry?: JournalEntry | null
  isDarkMode: boolean
}

const emojiOptions = ["😊", "😕", "😍", "🤔", "🎉", "💡", "🚀", "⭐"]
const tagOptions = ["HTML", "CSS", "JavaScript", "Python", "Robotics", "Math", "Science", "Art"]

export default function AddNoteModal({ isOpen, onClose, onSave, editingEntry, isDarkMode }: AddNoteModalProps) {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("😊")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title)
      setSummary(editingEntry.summary)
      setSelectedEmoji(editingEntry.emoji)
      setSelectedTags(editingEntry.tags)
    } else {
      setTitle("")
      setSummary("")
      setSelectedEmoji("😊")
      setSelectedTags([])
    }
    setCustomTag("")
  }, [editingEntry, isOpen])

  const handleSave = () => {
    if (!title.trim() || !summary.trim()) return

    const entry = {
      title: title.trim(),
      date: editingEntry?.date || new Date().toISOString(),
      summary: summary.trim(),
      emoji: selectedEmoji,
      tags: selectedTags,
      ...(editingEntry && { id: editingEntry.id, color: editingEntry.color }),
    }

    onSave(entry)
    onClose()
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags((prev) => [...prev, customTag.trim()])
      setCustomTag("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
            {editingEntry ? "Edit Note" : "Add New Note"} ✨
          </h2>
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              What did you learn today? 🤓
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Built my first website!"
              className={`rounded-xl ${isDarkMode ? "bg-slate-700 border-slate-600 text-white" : "border-purple-200"}`}
            />
          </div>

          {/* Summary */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              Tell us more! 📝
            </label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what you learned, what was fun, what was challenging..."
              rows={4}
              className={`rounded-xl resize-none ${
                isDarkMode ? "bg-slate-700 border-slate-600 text-white" : "border-purple-200"
              }`}
            />
          </div>

          {/* Emoji Selection */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              How do you feel? 😊
            </label>
            <div className="grid grid-cols-4 gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-3 rounded-xl text-2xl transition-colors ${
                    selectedEmoji === emoji
                      ? "bg-purple-400 text-white"
                      : isDarkMode
                        ? "bg-slate-700 hover:bg-slate-600"
                        : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              What topics did you explore? 🏷️
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-purple-400 text-white"
                      : isDarkMode
                        ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Custom Tag Input */}
            <div className="flex gap-2">
              <Input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add custom tag..."
                className={`flex-1 rounded-xl ${
                  isDarkMode ? "bg-slate-700 border-slate-600 text-white" : "border-purple-200"
                }`}
                onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
              />
              <Button onClick={addCustomTag} variant="outline" className="rounded-xl bg-transparent">
                Add
              </Button>
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1 bg-purple-400 text-white rounded-full text-sm cursor-pointer hover:bg-purple-500 transition-colors"
                  >
                    {tag} ×
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !summary.trim()}
            className="w-full bg-purple-400 hover:bg-purple-500 text-white rounded-xl py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-5 h-5 mr-2" />
            {editingEntry ? "Update Note" : "Save Note"} 🎉
          </Button>
        </div>
      </div>
    </div>
  )
}
