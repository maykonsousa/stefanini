import {
    MigrationInterface,
    QueryRunner,
    TableForeignKey,
    Table,
} from 'typeorm';

export default class CreateFuntionalities1598369045647
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'functionalities',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },

                    {
                        name: 'profile',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'profiles',
            new TableForeignKey({
                name: 'functionalities_profile',
                columnNames: ['profile'],
                referencedColumnNames: ['name'],
                referencedTableName: 'profiles',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'functionalities',
            'functionalities_profile',
        );
        await queryRunner.dropTable('functionalities');
    }
}
