import { MigrationInterface, QueryRunner } from "typeorm";

export class fixScheduleDateColumn1678675736231 implements MigrationInterface {
    name = 'fixScheduleDateColumn1678675736231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ALTER COLUMN "data" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ALTER COLUMN "data" SET DEFAULT now()`);
    }

}
