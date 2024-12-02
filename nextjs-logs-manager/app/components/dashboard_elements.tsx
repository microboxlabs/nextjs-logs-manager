import { TableRow, TableCell } from "flowbite-react";

interface DashboardElementProps {
  date: String;
  hour: String;
  type: String;
  service_name: String;
  message: String;
}

const DashboardElement: React.FC<DashboardElementProps> = ({
  date,
  hour,
  type,
  service_name,
  message,
}) => {
  const getTypeColor = (type: String) => {
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

  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="text-gray-800 dark:text-gray-300">{date}</TableCell>
      <TableCell className="text-gray-800 dark:text-gray-300">{hour}</TableCell>
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
