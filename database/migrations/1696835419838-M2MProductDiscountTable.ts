import { MigrationInterface, QueryRunner } from "typeorm";

export class M2MProductDiscountTable1696835419838 implements MigrationInterface {
    name = 'M2MProductDiscountTable1696835419838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ProductDiscount" ("products" integer NOT NULL, "discount" integer NOT NULL, CONSTRAINT "PK_57ee459cbb42c5578c44a040e76" PRIMARY KEY ("products", "discount"))`);
        await queryRunner.query(`CREATE INDEX "IDX_16699c0ae384bd4d6c9e65726d" ON "ProductDiscount" ("products") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a27ce493a39bfd052e13f0169" ON "ProductDiscount" ("discount") `);
        await queryRunner.query(`ALTER TABLE "ProductDiscount" ADD CONSTRAINT "FK_16699c0ae384bd4d6c9e65726d2" FOREIGN KEY ("products") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ProductDiscount" ADD CONSTRAINT "FK_6a27ce493a39bfd052e13f0169f" FOREIGN KEY ("discount") REFERENCES "discount"("discount_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProductDiscount" DROP CONSTRAINT "FK_6a27ce493a39bfd052e13f0169f"`);
        await queryRunner.query(`ALTER TABLE "ProductDiscount" DROP CONSTRAINT "FK_16699c0ae384bd4d6c9e65726d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a27ce493a39bfd052e13f0169"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16699c0ae384bd4d6c9e65726d"`);
        await queryRunner.query(`DROP TABLE "ProductDiscount"`);
    }

}
