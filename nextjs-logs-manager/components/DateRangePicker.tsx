import { FC } from 'react'
import { TextInput, Label, Button } from 'flowbite-react'
import { HiCalendar } from 'react-icons/hi'

interface DateRangePickerProps {
  startDate: Date | null
  endDate: Date | null
  onChange: (start: Date | null, end: Date | null) => void
}

export const DateRangePicker: FC<DateRangePickerProps> = ({ startDate, endDate, onChange }) => {
  const setLastWeek = () => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 7)
    onChange(start, end)
  }

  const setLastDay = () => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 1)
    onChange(start, end)
  }

  const clearDates = () => {
    onChange(null, null)
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center h-auto sm:h-[32px]">
        <Label value="Rango de fechas" className="text-sm font-medium text-gray-700 dark:text-gray-300" />
        <div className="flex flex-wrap gap-1">
          <Button 
            size="xs" 
            color="gray" 
            onClick={setLastDay} 
            className="px-2 whitespace-nowrap bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
          >
            Último día
          </Button>
          <Button 
            size="xs" 
            color="gray" 
            onClick={setLastWeek} 
            className="px-2 whitespace-nowrap bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
          >
            Última semana
          </Button>
          <Button 
            size="xs" 
            color="gray" 
            onClick={clearDates} 
            className="px-2 whitespace-nowrap bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
          >
            Limpiar
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="w-full">
          <TextInput
            type="date"
            icon={HiCalendar}
            value={startDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null
              onChange(date, endDate)
            }}
            sizing="sm"
            addon={<span className="w-12 text-center">Desde</span>}
            className="w-full [&>div:first-child]:w-[4.5rem]"
          />
        </div>
        <div className="w-full">
          <TextInput
            type="date"
            icon={HiCalendar}
            value={endDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null
              onChange(startDate, date)
            }}
            sizing="sm"
            addon={<span className="w-12 text-center">Hasta</span>}
            className="w-full [&>div:first-child]:w-[4.5rem]"
          />
        </div>
      </div>
    </div>
  )
} 