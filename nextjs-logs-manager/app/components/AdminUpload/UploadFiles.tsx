'use client';
import { useState } from "react";
import { FileInput, Label, Alert } from "flowbite-react";
import { notifyServer, processFiles, updateLocalStorage } from "@/app/utils";
import Cookies from 'js-cookie';

const FileUploader = () => {
  const [logs, setLogs] = useState<ILogs[]>([]); 
  const [isProcessing, setIsProcessing] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>("");   
  const [successMessage, setSuccessMessage] = useState<string>("");   
  const token = Cookies.get("auth-token");



  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (token != "admin") return;
 
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles) return;
  
    const validFiles = selectedFiles.filter(file => file.type === 'text/plain');
    if (validFiles.length === 0) {
      setErrorMessage("Por favor, sube solo archivos de tipo .txt.");
      return;
    }
  
    setIsProcessing(true);
  
    try {
      const extractedLogs = await processFiles(validFiles);
      updateLocalStorage(extractedLogs);
      setLogs(extractedLogs);
      setErrorMessage("");
      await notifyServer();
    } catch (error) {
      console.error("Error al procesar archivos o enviar al servidor:", error);
      setErrorMessage("Hubo un error al procesar los logs.");
    } finally {
      setSuccessMessage("Logs subidos correctamente")
      setIsProcessing(false);
    }
  };
  



  return (
    <div className="p-4">      

        {errorMessage && (
        <Alert color="failure" className="mb-4">
            <span className="font-medium">{errorMessage}</span>
        </Alert>
        )}

        {successMessage && (
        <Alert color="success" className="mb-4">
            <span className="font-medium">{successMessage}</span>
        </Alert>
        )}

      <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> 
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">.txt</p>
        </div>
        <FileInput multiple accept=".txt" onChange={handleFileChange} id="dropzone-file" className="hidden" />
      </Label>
    </div>

      {isProcessing && (
        <div className="text-center text-gray-600 mb-4">Procesando archivos...</div>
      )}

      <div>
        <h3 className="text-lg font-semibold">Logs Procesados</h3>
        <div className="overflow-y-auto">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="border-b py-2">
                <p><strong>{log.timestamp}</strong> {log.logLevel} {log.serviceName}: {log.message}</p>
              </div>
            ))
          ) : (
            <p>No hay logs procesados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;