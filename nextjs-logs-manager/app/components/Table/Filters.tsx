'use client'
import { Label, Select } from "flowbite-react";
import React, { useState, useEffect } from "react";

interface FiltersProps {
  logs: ILogs[];
  onFilter: (filteredLogs: ILogs[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ logs, onFilter }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [logLevel, setLogLevel] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>("");

  const uniqueServiceNames = Array.from(new Set(logs.map(log => log.serviceName)));

  useEffect(() => {
    let filteredLogs = [...logs];

    if (startDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(startDate));
    }
    if (endDate) {
      filteredLogs = filteredLogs.filter(log =>  {
       const endDateObj = new Date(endDate);
       endDateObj.setUTCHours(23, 59, 59, 999);
   
       return new Date(log.timestamp) <= endDateObj; 
    }
    );
    }
    if (logLevel) {
      filteredLogs = filteredLogs.filter(log => log.logLevel === logLevel);
    }
    if (serviceName) {
      filteredLogs = filteredLogs.filter(log => log.serviceName === serviceName);
    }

    filteredLogs = filteredLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    onFilter(filteredLogs);
  }, [startDate, endDate, logLevel, serviceName, logs]); 

  return (
    <div className="block md:flex px-4 md:px-0 gap-10 mb-3 items-center">
      <div className="flex flex-col">
        <Label htmlFor="startDate" value="Fecha de inicio" />
        <input
          id="startDate"
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="endDate" value="Fecha de fin" />
        <input
          id="endDate"
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="">
        <Label htmlFor="logLevel" value="Log Level" />
        <Select
          id="logLevel"
          value={logLevel}
          onChange={(e) => setLogLevel(e.target.value)}
        >
          <option value="">Todos los niveles</option>
          <option value="INFO">INFO</option>
          <option value="WARNING">WARNING</option>
          <option value="ERROR">ERROR</option>
        </Select>
      </div>

      <div className="">
        <Label htmlFor="serviceName" value="Service Name" />
        <Select
          id="serviceName"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        >
          <option value="">Todos los servicios</option>
          {uniqueServiceNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Filters;