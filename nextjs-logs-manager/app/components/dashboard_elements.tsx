import { TableRow, TableCell } from "flowbite-react";

interface DashboardElementProps {
  datetime: Date;
  type: string;
  service_name: string;
  message: string;
}

const DashboardElement: React.FC<DashboardElementProps> = ({
  datetime,
  type,
  service_name,
  message,
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "ERROR":
        return "text-red-500";
      case "INFO":
        return "text-green-500";
      case "WARNING":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  const day = String(datetime.getUTCDate()).padStart(2, "0");
  const month = String(datetime.getUTCMonth() + 1).padStart(2, "0");
  const year = datetime.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const hours = String(datetime.getUTCHours()).padStart(2, "0");
  const minutes = String(datetime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(datetime.getUTCSeconds()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="text-gray-800 dark:text-gray-300">
        {formattedDate}
      </TableCell>
      <TableCell className="text-gray-800 dark:text-gray-300">
        {formattedTime}
      </TableCell>
      <TableCell className={getTypeColor(type)}>{type}</TableCell>
      <TableCell className="text-gray-800 dark:text-gray-300">
        {service_name}
      </TableCell>
      <TableCell className=" text-gray-900 dark:text-gray-200">
        {message}
      </TableCell>
    </TableRow>
  );
};

export default DashboardElement;
