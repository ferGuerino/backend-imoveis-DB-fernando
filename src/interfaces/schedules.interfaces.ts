import { z } from "zod";
import { createScheduleSchema } from "../schemas/schedules.schemas";

type iSchedules = z.infer<typeof createScheduleSchema>;

export { iSchedules };
