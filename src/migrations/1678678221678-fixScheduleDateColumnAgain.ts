import { MigrationInterface, QueryRunner } from "typeorm";

export class fixScheduleDateColumnAgain1678678221678 implements MigrationInterface {
    name = 'fixScheduleDateColumnAgain1678678221678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "data" TO "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "date" TO "data"`);
    }

}
