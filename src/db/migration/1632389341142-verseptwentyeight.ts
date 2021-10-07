import {MigrationInterface, QueryRunner} from "typeorm";

export class verseptwentyeight1632389341142 implements MigrationInterface {
    name = 'verseptwentyeight1632389341142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sebackend\`.\`task_teams_team\` (\`taskPkTaskId\` int NOT NULL, \`teamPkTeamId\` varchar(255) NOT NULL, INDEX \`IDX_65153b7d740ced56e66eef90ee\` (\`taskPkTaskId\`), INDEX \`IDX_c8b9f4405ea141f85a71a580c1\` (\`teamPkTeamId\`), PRIMARY KEY (\`taskPkTaskId\`, \`teamPkTeamId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_teams_team\` ADD CONSTRAINT \`FK_65153b7d740ced56e66eef90eef\` FOREIGN KEY (\`taskPkTaskId\`) REFERENCES \`sebackend\`.\`Task\`(\`pkTask_Id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_teams_team\` ADD CONSTRAINT \`FK_c8b9f4405ea141f85a71a580c11\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_teams_team\` DROP FOREIGN KEY \`FK_c8b9f4405ea141f85a71a580c11\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`task_teams_team\` DROP FOREIGN KEY \`FK_65153b7d740ced56e66eef90eef\``);
        await queryRunner.query(`DROP INDEX \`IDX_c8b9f4405ea141f85a71a580c1\` ON \`sebackend\`.\`task_teams_team\``);
        await queryRunner.query(`DROP INDEX \`IDX_65153b7d740ced56e66eef90ee\` ON \`sebackend\`.\`task_teams_team\``);
        await queryRunner.query(`DROP TABLE \`sebackend\`.\`task_teams_team\``);
    }

}
