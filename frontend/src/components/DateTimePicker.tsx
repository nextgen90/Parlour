import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function DateTimePicker({ value, onChange, required }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Basic date state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const TIME_SLOTS = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update parent value when date or time changes
  useEffect(() => {
    if (selectedDate && selectedTime) {
      // Format as YYYY-MM-DDTHH:mm (datetime-local format approximation)
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      
      // Convert 12h to 24h
      let [time, modifier] = selectedTime.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') {
        hours = '00';
      }
      if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12);
      }
      
      onChange(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  }, [selectedDate, selectedTime, onChange]);

  // Calendar logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth.getMonth() && 
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  // Format display value
  const getDisplayValue = () => {
    if (!selectedDate) return '';
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return selectedTime ? `${dateStr} at ${selectedTime}` : dateStr;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-b border-white/20 py-3 bg-transparent text-white cursor-pointer hover:border-[var(--color-tertiary)] transition-colors text-sm flex items-center justify-between"
      >
        <span className={getDisplayValue() ? 'text-white' : 'text-gray-400'}>
          {getDisplayValue() || 'Select Date & Time'}
        </span>
        <Calendar size={16} className="text-gray-400" />
      </div>

      <input 
        type="hidden" 
        required={required} 
        value={value} 
        onChange={() => {}} 
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 md:left-auto md:right-0 top-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl z-50 p-4 w-full md:w-[600px]"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side: Calendar */}
              <div className="flex-1">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button type="button" onClick={handlePrevMonth} className="p-1 hover:text-[var(--color-tertiary)] transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button type="button" onClick={handleNextMonth} className="p-1 hover:text-[var(--color-tertiary)] transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-[10px] text-gray-500 font-semibold mb-2">{day}</div>
                  ))}
                  {blanks.map(blank => (
                    <div key={`blank-${blank}`} className="p-2"></div>
                  ))}
                  {days.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                      className={`p-2 text-sm rounded-full transition-all duration-300 ${
                        isSelected(day) 
                          ? 'bg-[var(--color-tertiary)] text-black font-bold scale-110' 
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Time Slots */}
              <div className="flex-1 flex flex-col border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-[var(--color-secondary)]" />
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Select Time</span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-2 gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar max-h-48">
                  {TIME_SLOTS.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 text-[10px] sm:text-xs rounded border transition-all duration-300 ${
                        selectedTime === time
                          ? 'bg-[var(--color-tertiary)] border-[var(--color-tertiary)] text-black font-bold'
                          : 'border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Confirm Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={!selectedDate || !selectedTime}
                  className="mt-4 w-full py-3 bg-white/5 hover:bg-[var(--color-tertiary)] hover:text-black border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
