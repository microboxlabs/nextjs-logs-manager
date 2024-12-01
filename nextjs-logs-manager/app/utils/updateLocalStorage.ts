  
  export const updateLocalStorage = (logs: ILogs[]): void => {
    const existingLogs = JSON.parse(localStorage.getItem("logs") || "[]");
    const allLogs = [...existingLogs, ...logs];
    localStorage.setItem("logs", JSON.stringify(allLogs));
  };