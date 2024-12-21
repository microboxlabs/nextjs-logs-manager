import LogRepository from "@/src/modules/records/domain/LogRepository";
import LogRecord from "@/src/modules/records/domain/LogRecord";

const saveLogs = async ({
  records,
  repository,
}: {
  records: LogRecord[];
  repository: LogRepository;
}): Promise<void> => {
  await repository.save(records);
};

export default saveLogs;
