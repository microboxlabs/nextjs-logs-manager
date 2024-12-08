'use client'

import { Modal, Button, Label, TextInput, Select } from 'flowbite-react'
import { LogEntry, LogLevel, LogService } from '@/types/logs'
import { useState, useEffect } from 'react'

interface EditLogModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: (updatedLog: Partial<LogEntry>) => void
  log: LogEntry | null
  services: string[]
  levels: LogLevel[]
}

export function EditLogModal({ isOpen, onClose, onConfirm, log, services, levels }: EditLogModalProps) {
  const [service, setService] = useState<LogService>('AUTH' as LogService)
  const [level, setLevel] = useState<LogLevel>('INFO' as LogLevel)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (log) {
      setService(log.service)
      setLevel(log.level)
      setMessage(log.message)
    }
  }, [log])

  const handleSubmit = () => {
    if (onConfirm) {
      onConfirm({
        service,
        level,
        message
      })
    }
    onClose()
  }

  if (!log) return null

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Editar Log</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="service" value="Servicio" />
            </div>
            <Select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value as LogService)}
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="level" value="Nivel" />
            </div>
            <Select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value as LogLevel)}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="message" value="Mensaje" />
            </div>
            <TextInput
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="blue" onClick={handleSubmit}>
          Guardar cambios
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
} 