import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, 
  X, 
  Minus, 
  Maximize2, 
  ChevronUp,
  ChevronDown,
  Shield,
  Zap
} from 'lucide-react';

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'ascii';
  content: string;
  timestamp?: string;
}

interface DashboardTerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  height: number;
  onHeightChange: (height: number) => void;
}

// ==========================================
// ASCII ART WELCOME
// ==========================================
const ASCII_LOGO = `
   ╔═══════════════════════════════════════════════════════════════╗
   ║     _   _   _ _____ _   _ ___ _____    ____ _     ___         ║
   ║    / \\ | | | |_   _| | | |_ _|_   _|  / ___| |   |_ _|        ║
   ║   / _ \\| | | | | | | |_| || |  | |   | |   | |    | |         ║
   ║  / ___ \\ |_| | | | |  _  || |  | |   | |___| |___ | |         ║
   ║ /_/   \\_\\___/  |_| |_| |_|___| |_|    \\____|_____|___|        ║
   ║                                                                ║
   ║  Wine Authentication Platform • Enterprise CLI v3.2.1         ║
   ╚═══════════════════════════════════════════════════════════════╝
`;

const WELCOME_MESSAGES: TerminalLine[] = [
  { id: 1, type: 'ascii', content: ASCII_LOGO },
  { id: 2, type: 'info', content: '🍷 Welcome to AuthIt CLI - Protecting wine authenticity since 2024' },
  { id: 3, type: 'info', content: '⚡ Type "help" for available commands or "quick" for quick actions' },
  { id: 4, type: 'output', content: '─'.repeat(65) },
];

// ==========================================
// AVAILABLE COMMANDS
// ==========================================
const COMMANDS: Record<string, { description: string; execute: () => TerminalLine[] }> = {
  help: {
    description: 'Show available commands',
    execute: () => [
      { id: Date.now(), type: 'info', content: '📋 Available Commands:' },
      { id: Date.now() + 1, type: 'output', content: '' },
      { id: Date.now() + 2, type: 'output', content: '  help          - Show this help message' },
      { id: Date.now() + 3, type: 'output', content: '  clear         - Clear terminal' },
      { id: Date.now() + 4, type: 'output', content: '  status        - Show system status' },
      { id: Date.now() + 5, type: 'output', content: '  batches       - List recent batches' },
      { id: Date.now() + 6, type: 'output', content: '  quick         - Show quick actions' },
      { id: Date.now() + 7, type: 'output', content: '  version       - Show CLI version' },
      { id: Date.now() + 8, type: 'output', content: '  whoami        - Show current user' },
      { id: Date.now() + 9, type: 'output', content: '  exit          - Close terminal' },
      { id: Date.now() + 10, type: 'output', content: '' },
      { id: Date.now() + 11, type: 'info', content: '💡 Tip: More commands coming soon with AuthIt CLI!' },
    ],
  },
  status: {
    description: 'Show system status',
    execute: () => [
      { id: Date.now(), type: 'success', content: '✓ System Status: All Systems Operational' },
      { id: Date.now() + 1, type: 'output', content: '' },
      { id: Date.now() + 2, type: 'output', content: '  Database     │ ● ONLINE  │ 12ms latency' },
      { id: Date.now() + 3, type: 'output', content: '  API Gateway  │ ● ONLINE  │ 99.97% uptime' },
      { id: Date.now() + 4, type: 'output', content: '  Storage      │ ● ONLINE  │ 78.4/500 GB' },
      { id: Date.now() + 5, type: 'output', content: '  CPU Usage    │ ● NORMAL  │ 34%' },
      { id: Date.now() + 6, type: 'output', content: '' },
    ],
  },
  version: {
    description: 'Show CLI version',
    execute: () => [
      { id: Date.now(), type: 'info', content: '🔖 AuthIt CLI v3.2.1' },
      { id: Date.now() + 1, type: 'output', content: '   Built with ❤️ for wine authenticity' },
      { id: Date.now() + 2, type: 'output', content: '   © 2024 AuthIt Enterprise' },
    ],
  },
  quick: {
    description: 'Show quick actions',
    execute: () => [
      { id: Date.now(), type: 'info', content: '⚡ Quick Actions:' },
      { id: Date.now() + 1, type: 'output', content: '' },
      { id: Date.now() + 2, type: 'output', content: '  [1] Create new batch      → authit batch create' },
      { id: Date.now() + 3, type: 'output', content: '  [2] Generate QR codes     → authit qr generate <batch_id>' },
      { id: Date.now() + 4, type: 'output', content: '  [3] Check verification    → authit verify <code>' },
      { id: Date.now() + 5, type: 'output', content: '  [4] Export report         → authit export --format=pdf' },
      { id: Date.now() + 6, type: 'output', content: '' },
    ],
  },
  batches: {
    description: 'List recent batches',
    execute: () => [
      { id: Date.now(), type: 'info', content: '📦 Recent Batches:' },
      { id: Date.now() + 1, type: 'output', content: '' },
      { id: Date.now() + 2, type: 'output', content: '  B-2024-0892 │ Château Margaux 2020    │ 2,400 bottles │ ● ACTIVE' },
      { id: Date.now() + 3, type: 'output', content: '  B-2024-0891 │ Saperavi Reserve 2021   │ 1,200 bottles │ ● ACTIVE' },
      { id: Date.now() + 4, type: 'output', content: '  B-2024-0890 │ Rkatsiteli Qvevri 2020  │ 3,600 bottles │ ● ACTIVE' },
      { id: Date.now() + 5, type: 'output', content: '' },
      { id: Date.now() + 6, type: 'info', content: '   Total: 1,247 batches │ 847,293 active codes' },
    ],
  },
  whoami: {
    description: 'Show current user',
    execute: () => [
      { id: Date.now(), type: 'success', content: '👤 Current User:' },
      { id: Date.now() + 1, type: 'output', content: '   Email: personalmailgt@gmail.com' },
      { id: Date.now() + 2, type: 'output', content: '   Role: Enterprise Admin' },
      { id: Date.now() + 3, type: 'output', content: '   Session: Active' },
    ],
  },
};

export function DashboardTerminal({ isOpen, onToggle, height, onHeightChange }: DashboardTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_MESSAGES);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add input line
    const inputLine: TerminalLine = {
      id: Date.now(),
      type: 'input',
      content: `authit@enterprise:~$ ${cmd}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    if (trimmedCmd === 'clear') {
      setLines(WELCOME_MESSAGES);
      return;
    }

    if (trimmedCmd === 'exit') {
      onToggle();
      return;
    }

    const command = COMMANDS[trimmedCmd];
    if (command) {
      setLines(prev => [...prev, inputLine, ...command.execute()]);
    } else if (trimmedCmd) {
      setLines(prev => [
        ...prev,
        inputLine,
        { id: Date.now() + 1, type: 'error', content: `Command not found: ${trimmedCmd}. Type "help" for available commands.` },
      ]);
    }

    // Add to history
    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = startY - e.clientY;
      const newHeight = Math.min(Math.max(startHeight + delta, 150), 500);
      onHeightChange(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="shrink-0 border-t border-border bg-[#1a1a2e] flex flex-col"
      style={{ height: `${height}px` }}
    >
      {/* Resize Handle */}
      <div
        ref={resizeRef}
        className="h-1 bg-transparent hover:bg-primary/50 cursor-ns-resize transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Terminal Header */}
      <div className="h-8 bg-[#16162a] border-b border-[#2a2a4a] flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-slate-300">TERMINAL</span>
          <Badge variant="outline" className="h-4 text-[9px] bg-primary/10 text-primary border-primary/30">
            AuthIt CLI
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 hover:bg-white/10"
            onClick={() => onHeightChange(height === 150 ? 300 : 150)}
          >
            {height > 200 ? <Minus className="h-3 w-3 text-slate-400" /> : <Maximize2 className="h-3 w-3 text-slate-400" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 hover:bg-white/10"
            onClick={onToggle}
          >
            <X className="h-3 w-3 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-xs terminal-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className={`
            ${line.type === 'input' ? 'text-green-400' : ''}
            ${line.type === 'output' ? 'text-slate-400' : ''}
            ${line.type === 'error' ? 'text-red-400' : ''}
            ${line.type === 'success' ? 'text-emerald-400' : ''}
            ${line.type === 'info' ? 'text-cyan-400' : ''}
            ${line.type === 'ascii' ? 'text-primary whitespace-pre' : ''}
            leading-relaxed
          `}>
            {line.content}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center text-green-400 mt-1">
          <span className="text-slate-500 mr-1">authit@enterprise:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="w-2 h-4 bg-green-400 animate-pulse ml-0.5" />
        </div>
      </div>
    </div>
  );
}