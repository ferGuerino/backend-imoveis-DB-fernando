import { MigrationInterface, QueryRunner } from "typeorm";

export class fixCategoryColumn1678466067589 implements MigrationInterface {
    name = 'fixCategoryColumn1678466067589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" DROP DEFAULT`);
    }

}
