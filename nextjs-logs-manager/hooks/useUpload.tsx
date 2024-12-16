
import { FileContent } from '@/types/types';
import { uploadData } from '@/utils/uploadData';
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const useUpload = () => {
    const [fileContent, setFileContent] = useState<FileContent[]>([]);
    const router = useRouter()
    const handleFileChange = (e: any) => {
        const file = e.target.files[0]; // Obtén el archivo seleccionado
        if (file) {
            const reader = new FileReader(); // Crea un lector de archivos
            reader.onload = () => {
                const text = reader.result as string;
                const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
                const parsedData = lines.reduce((acc: FileContent[], line) => {
                    const regex = /^\[(.*?)]\ \[(.*?)\] (.*?): (.*)$/;
                    const match = line.match(regex);

                    if (match) {
                        const [, date, status, service, message] = match;

                        acc.push({ date, status, service, message });
                    }

                    return acc;
                }, []);
                setFileContent(parsedData)
            };
            reader.readAsText(file); // Lee el archivo como texto
        }
    };

    const upload = async () => {
        await uploadData(fileContent)
        router.push('/dashboard ')
        window.location.href = '/dashboard';
    }

    return {
        fileContent,
        handleFileChange,
        upload
    }

}
