export const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };


 export  const parseLogFile = (content: string): ILogs[] | null  => {

    try {
        const logPattern = /\[(.*?)\] \[(.*?)\] (.*?)\: (.*?)(?=\s*\[|\s*$)/g;
        const logs: ILogs[] = [];
        let match;
    
        while ((match = logPattern.exec(content)) !== null) {
          const timestamp = match[1];  
          const logLevel = match[2];    
          const serviceName = match[3]; 
          const message = match[4];     
    
          logs.push({ timestamp, logLevel, serviceName, message });
        }
    
        return logs.length > 0 ? logs : null;
    } catch (error) {
        console.error("Error al procesar el archivo:", error);
        return null;  
    }

  };