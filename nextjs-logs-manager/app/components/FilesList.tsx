import { generateId } from "@/app/shared/utils";
import type { TUploadedFile } from "./LogForm";

type Props = {
  files?: TUploadedFile[];
  onRemove: (id: string) => void;
};

export default function FilesList({ files, onRemove }: Props) {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <ul>
      {files.map((up) => (
        <li key={generateId()}>
          <p>{up.file.name}</p>
          <p>
            {up.file.size} <span>b</span>
          </p>
          <button onClick={onRemove.bind(null, up.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
