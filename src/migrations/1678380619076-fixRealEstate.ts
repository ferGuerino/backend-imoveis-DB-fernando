import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRealEstate1678380619076 implements MigrationInterface {
    name = 'fixRealEstate1678380619076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" SET NOT NULL`);
    }

}
