import { z } from "zod";

const UserSchema = z.object({
  userId: z.string().min(1),
  isAuthenticated: z.boolean(),
});

export type UserData = z.output<typeof UserSchema>;

export const storage = {
  async storeUserData(payload: z.input<typeof UserSchema>) {
    const data = await UserSchema.parseAsync(payload);
    const stringifyData = JSON.stringify(data);
    localStorage.setItem("user", stringifyData);
  },
  async getUserData() {
    const data = JSON.parse(localStorage.getItem("user") ?? "{}");
    const result = await UserSchema.parseAsync(data);

    return result;
  },
  removeStoreData() {
    localStorage.removeItem("user");
  },
};