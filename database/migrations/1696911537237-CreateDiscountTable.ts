import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDiscountTable1696911537237 implements MigrationInterface {
    name = 'CreateDiscountTable1696911537237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."discount_discount_type_enum" AS ENUM('flat', 'percent')`);
        await queryRunner.query(`CREATE TABLE "discount" ("discount_id" SERIAL NOT NULL, "coupon" character varying NOT NULL, "description" text, "discount_type" "public"."discount_discount_type_enum" NOT NULL DEFAULT 'flat', "discount_rate" numeric(10,2) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "UQ_8b65103f361d1624a81d4ab0a01" UNIQUE ("coupon"), CONSTRAINT "PK_8cabf52f6aceabf176dc2c837e5" PRIMARY KEY ("discount_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "discount"`);
        await queryRunner.query(`DROP TYPE "public"."discount_discount_type_enum"`);
    }

}
