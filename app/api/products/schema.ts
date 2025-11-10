import { z } from "zod";

const schema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  price: z
    .number({ message: "Price is required" })
    .min(1, { message: "Price must be at least 1" })
    .max(100, { message: "Price must be at most 100" }),
});

export default schema;
