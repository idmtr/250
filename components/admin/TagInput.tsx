'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { useClickOutside } from '@/hooks/use-click-outside'

interface TagInputProps {
  placeholder?: string
  value: string[]
  onChange: (value: string[]) => void
  suggestions?: string[]
}

export function TagInput({
  placeholder = 'Add tags...',
  value = [],
  onChange,
  suggestions = [],
}: TagInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = React.useState('')
  const [showSuggestions, setShowSuggestions] = React.useState(false)

  // Handle click outside
  useClickOutside(containerRef, () => {
    setShowSuggestions(false)
  })

  const handleUnselect = (tag: string) => {
    onChange(value.filter((v) => v !== tag))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current
    if (!input) return

    if (e.key === 'Enter' && inputValue) {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag])
        setInputValue('')
        setShowSuggestions(false)
      }
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false)
      input.blur()
    }

    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      e.preventDefault()
      handleUnselect(value[value.length - 1])
    }

    if (e.key === ',' && inputValue) {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag])
        setInputValue('')
        setShowSuggestions(false)
      }
    }
  }

  const filteredSuggestions = suggestions.filter(
    (tag) => 
      !value.includes(tag) && 
      tag.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div ref={containerRef} className="relative">
      <Command className="overflow-visible bg-transparent">
        <div className="group border rounded-md px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-2 flex-wrap">
            {value.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(tag)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            <CommandPrimitive>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none placeholder:text-muted-foreground flex-1 min-w-[120px]"
                placeholder={value.length === 0 ? placeholder : undefined}
              />
            </CommandPrimitive>
          </div>
        </div>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full mt-2 z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
            <CommandGroup className="h-full overflow-auto max-h-[200px]">
              {filteredSuggestions.map((tag) => (
                <CommandItem
                  key={tag}
                  onSelect={() => {
                    onChange([...value, tag])
                    setInputValue('')
                    setShowSuggestions(false)
                    inputRef.current?.focus()
                  }}
                >
                  {tag}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </Command>
    </div>
  )
}