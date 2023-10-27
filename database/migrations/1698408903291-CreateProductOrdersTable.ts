import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductOrdersTable1698408903291 implements MigrationInterface {
    name = 'CreateProductOrdersTable1698408903291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_orders" ("product_order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" integer NOT NULL, "product_name" character varying NOT NULL, "description" text, "category" character varying, "quantity" integer NOT NULL, "discountApplied" numeric(10,2) NOT NULL DEFAULT '0', "subtotal" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(10,2) NOT NULL DEFAULT '0', "orderDate" date NOT NULL, "status" character varying(20) NOT NULL, "order_id" integer, CONSTRAINT "UQ_f11db6de152893870c90f5a4bb5" UNIQUE ("product_name"), CONSTRAINT "PK_71cdc60dd2c19e0deaad95fce3e" PRIMARY KEY ("product_order_id"))`);
        await queryRunner.query(`ALTER TABLE "product_orders" ADD CONSTRAINT "FK_45d37655968e29740a00594a4fe" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_orders" DROP CONSTRAINT "FK_45d37655968e29740a00594a4fe"`);
        await queryRunner.query(`DROP TABLE "product_orders"`);
    }

}
