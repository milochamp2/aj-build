'use client';

import { useState } from 'react';
import { DateRangePicker as ReactDateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import { Calendar, X } from 'lucide-react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DateRangePickerProps {
  onDateChange?: (startDate: Date | undefined, endDate: Date | undefined) => void;
  className?: string;
}

export default function DateRangePicker({ onDateChange, className = '' }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    setDateRange([selection]);

    if (onDateChange) {
      onDateChange(selection.startDate, selection.endDate);
    }
  };

  const clearSelection = () => {
    const today = new Date();
    setDateRange([{
      startDate: today,
      endDate: today,
      key: 'selection'
    }]);

    if (onDateChange) {
      onDateChange(undefined, undefined);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Calendar className="h-4 w-4" />
        <span>
          {dateRange[0].startDate && dateRange[0].endDate
            ? `${formatDate(dateRange[0].startDate)} - ${formatDate(dateRange[0].endDate)}`
            : 'Select Date Range'}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Picker Container */}
          <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900">Select Date Range</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="date-range-picker-wrapper">
              <ReactDateRangePicker
                ranges={dateRange}
                onChange={handleSelect}
                months={2}
                direction="horizontal"
                moveRangeOnFirstSelection={false}
                rangeColors={['#8b5cf6']}
              />
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={clearSelection}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        .date-range-picker-wrapper .rdrCalendarWrapper {
          font-family: inherit;
        }

        .date-range-picker-wrapper .rdrDateDisplayWrapper {
          background-color: #f9fafb;
        }

        .date-range-picker-wrapper .rdrDateDisplay {
          margin: 0.5rem;
        }

        .date-range-picker-wrapper .rdrDateDisplayItem {
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          background-color: white;
        }

        .date-range-picker-wrapper .rdrDateDisplayItem input {
          color: #111827;
        }

        .date-range-picker-wrapper .rdrMonthAndYearWrapper {
          padding-top: 0;
        }

        .date-range-picker-wrapper .rdrMonthPicker select,
        .date-range-picker-wrapper .rdrYearPicker select {
          font-weight: 600;
          color: #111827;
        }

        .date-range-picker-wrapper .rdrDay {
          color: #374151;
        }

        .date-range-picker-wrapper .rdrDayToday .rdrDayNumber span:after {
          background: #8b5cf6;
        }

        .date-range-picker-wrapper .rdrDayDisabled {
          background-color: #f9fafb;
        }

        .date-range-picker-wrapper .rdrSelected,
        .date-range-picker-wrapper .rdrInRange,
        .date-range-picker-wrapper .rdrStartEdge,
        .date-range-picker-wrapper .rdrEndEdge {
          color: white !important;
        }

        .date-range-picker-wrapper .rdrDayStartPreview,
        .date-range-picker-wrapper .rdrDayInPreview,
        .date-range-picker-wrapper .rdrDayEndPreview {
          border-color: #c4b5fd;
        }

        .date-range-picker-wrapper .rdrDefinedRangesWrapper {
          border-right: 1px solid #e5e7eb;
        }

        .date-range-picker-wrapper .rdrStaticRange {
          border: 0;
          background-color: transparent;
        }

        .date-range-picker-wrapper .rdrStaticRange:hover,
        .date-range-picker-wrapper .rdrStaticRange:focus {
          background-color: #f3f4f6;
        }

        .date-range-picker-wrapper .rdrStaticRangeSelected {
          background-color: #ede9fe;
          color: #6b21a8;
        }
      `}</style>
    </div>
  );
}
