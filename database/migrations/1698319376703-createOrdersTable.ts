import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1698319376703 implements MigrationInterface {
    name = 'CreateOrdersTable1698319376703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_order_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "shipping_address" character varying(20) NOT NULL, "contact_number" character varying(10) NOT NULL, "card_number" character varying(16) NOT NULL, "total_amount" numeric(10,2) NOT NULL DEFAULT '0', "orderDate" date NOT NULL, "order_status" "public"."orders_order_status_enum" NOT NULL DEFAULT 'pending', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_status_enum"`);
    }

}
