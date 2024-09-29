'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Terminal as TerminalIcon } from 'lucide-react'

export const TerminalModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<Array<{ command: string; response: string }>>([])
  const [input, setInput] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === ';') {
        event.preventDefault()
        setIsOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    const response = await simulateLLMResponse(input, history)

    setHistory(prev => [
      ...prev,
      { command: input, response }
    ])

    setInput('')
  }

  // Simulate LLM response (replace with actual API call in a real application)
  const simulateLLMResponse = async (command: string, history: Array<{ command: string; response: string }>): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command, history }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling API:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 bg-gray-800 text-gray-200 hover:bg-gray-700">
          <TerminalIcon className="h-4 w-4" />
          <span className="sr-only">Open terminal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] bg-gray-900 border-gray-700">
        <div className="bg-gray-900 text-gray-300 p-4 rounded-lg shadow-lg w-full font-mono">
          <div ref={terminalRef} className="h-96 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {history.map((item, index) => (
              <div key={index}>
                <div className="flex">
                  <span className="text-yellow-500 mr-2">$</span>
                  <span>{item.command}</span>
                </div>
                <div className="ml-4 mb-2 text-gray-400">{item.response}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <span className="text-yellow-500 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent outline-none text-gray-300 placeholder-gray-500"
              placeholder="what do you want to know?"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog> 
  )
}