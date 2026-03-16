import { DatabaseError, RecordNotFoundError } from "../error";
import { db, eq, users } from "../postgresql";
import type { InsertUser, SelectUser } from "../schema/postgres";

export type IUserRepository = {
  getAll(): Promise<SelectUser[]>;
  create(userData: InsertUser): Promise<SelectUser>;
  findById(id: string): Promise<SelectUser | null>;
  findByEmail(email: string): Promise<SelectUser | null>;
  update(id: string, updatedData: InsertUser): Promise<SelectUser | null>;
  delete(id: string): Promise<boolean>;
};

export class UserRepository implements IUserRepository {
  public async getAll(): Promise<SelectUser[]> {
    try {
      const result = await db.select().from(users);
      return result;
    } catch (error) {
      throw new DatabaseError("Failed to fetch users.", error);
    }
  }

  public async create(data: InsertUser): Promise<SelectUser> {
    try {
      const result = await db.insert(users).values(data).returning();
      return result[0];
    } catch (error) {
      throw new DatabaseError("Failed to create new user.", error);
    }
  }

  public async findById(id: string): Promise<SelectUser> {
    try {
      const result = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id),
      });
      if (!result) {
        throw new RecordNotFoundError("User", id);
      }
      return result;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to fetch user.", error);
    }
  }

  public async findByEmail(email: string): Promise<SelectUser> {
    try {
      const result = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      });
      if (!result) {
        throw new RecordNotFoundError("User", email);
      }
      return result;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to fetch user.", error);
    }
  }

  public async update(
    id: string,
    data: Partial<InsertUser>,
  ): Promise<SelectUser> {
    try {
      const updatedRows = await db
        .update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning();
      if (updatedRows.length === 0) {
        throw new RecordNotFoundError("User", id);
      }
      return updatedRows[0];
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to update user.", error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const deletedRows = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning({ id: users.id });
      if (deletedRows.length === 0) {
        throw new RecordNotFoundError("User", id);
      }
      return true;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to delete user.", error);
    }
  }
}
