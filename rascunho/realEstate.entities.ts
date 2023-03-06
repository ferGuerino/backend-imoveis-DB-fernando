import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("real_estate")
class RealEstate {}

export { RealEstate };
