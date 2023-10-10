import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductDiscountTable1696915292616 implements MigrationInterface {
    name = 'CreateProductDiscountTable1696915292616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_discount" ("product_discount_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "apply_date" date NOT NULL, "end_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" integer, "discount_id" integer, CONSTRAINT "PK_3f0a0ee0536a8743a97af48fba9" PRIMARY KEY ("product_discount_id"))`);
        await queryRunner.query(`ALTER TABLE "product_discount" ADD CONSTRAINT "FK_87ba7804f51af91e9fb0d84c5dd" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_discount" ADD CONSTRAINT "FK_6080929074c3c5c5a2dbb55af44" FOREIGN KEY ("discount_id") REFERENCES "discount"("discount_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_discount" DROP CONSTRAINT "FK_6080929074c3c5c5a2dbb55af44"`);
        await queryRunner.query(`ALTER TABLE "product_discount" DROP CONSTRAINT "FK_87ba7804f51af91e9fb0d84c5dd"`);
        await queryRunner.query(`DROP TABLE "product_discount"`);
    }

}
