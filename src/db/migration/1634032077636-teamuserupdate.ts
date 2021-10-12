import {MigrationInterface, QueryRunner} from "typeorm";

export class teamuserupdate1634032077636 implements MigrationInterface {
    name = 'teamuserupdate1634032077636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` CHANGE \`team_user_Id\` \`teamUserId\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` CHANGE \`teamUserId\` \`team_user_Id\` int NOT NULL AUTO_INCREMENT`);
    }

}
