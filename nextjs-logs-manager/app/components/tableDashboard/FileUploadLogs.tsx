'use client';

import { useState } from 'react';
import { Button, FileInput } from 'flowbite-react';
type Log = {
  id: number;
  timestamp: string;
  level: string;
  service: string;
  message: string;
};

interface FileUploadLogsProps {
  onRefresh: () => void; // Refrescar logs paginados
  prependLogs: (newLogs: Log[]) => void; // Agregar nuevos logs
}

export default function FileUploadLogs({ onRefresh, prependLogs }: FileUploadLogsProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!file) {
      setError("Por favor, seleccione un archivo .txt");
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const content = await file.text();
      const response = await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileContent: content }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setSuccess("Logs cargados y procesados exitosamente.");
        
        // Agregar nuevos logs al inicio del estado del DataTable
        if (result.data && result.data.length > 0) {
          prependLogs(result.data); // Insertar nuevos logs procesados en el estado
          onRefresh(); // Refrescar los logs paginados
        }
      } else {
        console.warn("No new logs returned from the server."); //setError(result.error || "Error desconocido.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al subir el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold">Cargar archivo de logs</h2>

      <FileInput
        id="file-upload"
        onChange={handleFileChange}
        helperText="Seleccione un archivo .txt para cargar los logs"
      />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <Button onClick={handleUpload} disabled={loading} color="blue">
        {loading ? 'Subiendo...' : 'Cargar Archivo'}
      </Button>
    </div>
  );
}