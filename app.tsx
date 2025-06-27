"use client"

import { useState, useEffect } from "react"
import { Plus, BookOpen, User, Sun, Moon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Dashboard from "./components/dashboard"
import AddNoteModal from "./components/add-note-modal"
import BottomNav from "./components/bottom-nav"
import ProgressTracker from "./components/progress-tracker"

export interface JournalEntry {
  id: string
  title: string
  date: string
  summary: string
  emoji: string
  tags: string[]
  color: string
}

const pastelColors = [
  "bg-mint-100 border-mint-200",
  "bg-peach-100 border-peach-200",
  "bg-sky-100 border-sky-200",
  "bg-purple-100 border-purple-200",
  "bg-yellow-100 border-yellow-200",
  "bg-pink-100 border-pink-200",
  "bg-orange-100 border-orange-200",
  "bg-green-100 border-green-200",
]

export default function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [activeTab, setActiveTab] = useState("journal")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry: Omit<JournalEntry, "id" | "color">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
    }
    setEntries((prev) => [newEntry, ...prev])
  }

  const updateEntry = (updatedEntry: JournalEntry) => {
    setEntries((prev) => prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry)))
  }

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const getWeeklyCount = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return entries.filter((entry) => new Date(entry.date) >= oneWeekAgo).length
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-40 ${isDarkMode ? "bg-slate-800/90" : "bg-white/90"} backdrop-blur-sm border-b ${
          isDarkMode ? "border-slate-700" : "border-purple-200"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                My Learning Journal
              </h1>
              <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>After-school.tech</p>
            </div>
          </div>

          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            variant="ghost"
            size="icon"
            className="rounded-full hover:scale-110 transition-transform"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </Button>
        </div>

        <ProgressTracker count={getWeeklyCount()} isDarkMode={isDarkMode} />
      </header>

      {/* Main Content */}
      <main className="pb-24 px-4">
        {activeTab === "journal" && (
          <Dashboard entries={entries} onEdit={setEditingEntry} onDelete={deleteEntry} isDarkMode={isDarkMode} />
        )}

        {activeTab === "home" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center mb-6">
              <Star className="w-12 h-12 text-yellow-700" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              Welcome Back, Learner! 🌟
            </h2>
            <p className={`text-lg ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Ready to add a new learning adventure?
            </p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mb-6">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              Your Profile 👤
            </h2>
            <div className={`space-y-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              <p>Total Notes: {entries.length}</p>
              <p>This Week: {getWeeklyCount()}</p>
              <p>Keep up the great work! 🎉</p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-purple-400 hover:bg-purple-500 shadow-lg transition-colors duration-200 z-30"
        size="icon"
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />

      {/* Add/Edit Note Modal */}
      <AddNoteModal
        isOpen={isAddModalOpen || !!editingEntry}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingEntry(null)
        }}
        onSave={editingEntry ? updateEntry : addEntry}
        editingEntry={editingEntry}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}
