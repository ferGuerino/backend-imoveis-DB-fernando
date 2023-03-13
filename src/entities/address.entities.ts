import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { RealEstate } from "./realEstate.entities";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  street: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  number?: string | undefined | null;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (realEstate) => realEstate.address)
  realEstate: RealEstate;
}

export { Address };
