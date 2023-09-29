import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1695978915985 implements MigrationInterface {
    name = 'CreateProductTable1695978915985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_product_status_enum" AS ENUM('available', 'out_of_stock', 'discontinued')`);
        await queryRunner.query(`CREATE TABLE "products" ("product_id" SERIAL NOT NULL, "product_name" character varying NOT NULL, "description" text, "category" character varying, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "specifications" jsonb, "product_status" "public"."products_product_status_enum" NOT NULL DEFAULT 'available', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_894a8151f2433fca9b81acb2975" UNIQUE ("product_name"), CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_product_status_enum"`);
    }

}
