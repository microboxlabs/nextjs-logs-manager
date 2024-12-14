import { uploadData } from '@/utils/uploadData';
import { useState } from 'react'

export const useUpload = () => {
    const [fileContent, setFileContent] = useState<any>([]);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]; // Obtén el archivo seleccionado
        if (file) {
            const reader = new FileReader(); // Crea un lector de archivos
            reader.onload = () => {
                const text = reader.result as string;
                const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
                const parsedData = lines.map((line) => {

                    const regex = /^\[(.*?)]\ \[(.*?)\] (.*?): (.*)$/;
                    const match = line.match(regex);

                    if (match) {
                        const [, date, status, service, message] = match;
                        return { date, status, service, message };
                    }

                    return null; // Si no coincide, devolver null (puedes manejarlo según tus necesidades)
                }).filter(Boolean); // Elimina nulos

                setFileContent(parsedData);
            };
            reader.readAsText(file); // Lee el archivo como texto
        }
    };

    const upload = () => {
        uploadData(fileContent)
    }

    return {
        fileContent,
        handleFileChange,
        upload
    }

}
