import { getRounds, hashSync } from "bcryptjs";
import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Schedule } from "./schedule.entities";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean = false;

  @Column({ length: 120 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt?: string | null | undefined | Date;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncripted = getRounds(this.password);
    if (!isEncripted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export { User };
