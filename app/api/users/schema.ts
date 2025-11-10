import { z } from "zod";

const schema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
});

export default schema;
