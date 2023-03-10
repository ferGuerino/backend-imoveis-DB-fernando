import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRealEstateValue1678371144912 implements MigrationInterface {
    name = 'fixRealEstateValue1678371144912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric(5,2)`);
    }

}
