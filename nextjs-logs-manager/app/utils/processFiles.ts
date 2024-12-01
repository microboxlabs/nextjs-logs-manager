import { parseLogFile, readFileContent } from "./handleTxt";

export const processFiles = async (files: File[]): Promise<ILogs[]> => {
    const extractedLogs: ILogs[] = [];
    for (const file of files) {
      const fileContent = await readFileContent(file);
      const logsFromFile = parseLogFile(fileContent);
  
      if (!logsFromFile) {
        throw new Error("El archivo seleccionado no contiene logs");
      }
  
      extractedLogs.push(...logsFromFile);
    }
    return extractedLogs;
  };