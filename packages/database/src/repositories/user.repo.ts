import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import {
  db,
  users,
  type Database,
  type InsertUser,
  type SelectUser,
} from "../postgresql";
import { DatabaseError, RecordNotFoundError } from "../shared/error";

export type IUserRepository = {
  findAll(): Promise<SelectUser[]>;
  create(data: InsertUser): Promise<SelectUser>;
  findById(id: string): Promise<SelectUser | null>;
  existsByEmail(email: string): Promise<SelectUser | null>;
  findByEmail(email: string): Promise<SelectUser | null>;
  update(id: string, data: InsertUser): Promise<SelectUser | null>;
  delete(id: string): Promise<boolean>;
};

export class UserRepository implements IUserRepository {
  constructor(private readonly db: Database) {}

  public async findAll(): Promise<SelectUser[]> {
    try {
      const result = await this.db.select().from(users);
      return result;
    } catch (error) {
      throw new DatabaseError("Failed to fetch users.", error);
    }
  }

  public async create(data: InsertUser): Promise<SelectUser> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      const [result] = await this.db
        .insert(users)
        .values({ ...data, password: hashedPassword })
        .returning();
      if (!result) {
        throw new DatabaseError("Failed to create user.");
      }
      return result;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("Failed to create new user.", error);
    }
  }

  public async findById(id: string): Promise<SelectUser> {
    try {
      const result = await this.db.query.users.findFirst({
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

  public async existsByEmail(email: string): Promise<SelectUser | null> {
    try {
      const result = await this.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      });
      return result ?? null;
    } catch (error) {
      throw new DatabaseError("Failed to check user.", error);
    }
  }

  public async findByEmail(email: string): Promise<SelectUser> {
    try {
      const user = await this.existsByEmail(email);
      if (!user) {
        throw new RecordNotFoundError("User", email);
      }
      return user;
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
      const [result] = await this.db
        .update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning();
      if (!result) {
        throw new RecordNotFoundError("User", id);
      }
      return result;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to update user.", error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const deletedRows = await this.db
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

export const userRepository = new UserRepository(db);
