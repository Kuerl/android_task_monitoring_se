import {MigrationInterface, QueryRunner} from "typeorm";

export class vernd1632123064149 implements MigrationInterface {
    name = 'vernd1632123064149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` DROP FOREIGN KEY \`FK_197a6cac4f1db393eb433dee591\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` DROP FOREIGN KEY \`FK_fff1c035d94d3e1b296fc1c81e4\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` DROP COLUMN \`teamPkTeamId\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` DROP COLUMN \`userPkAccountId\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`User\` ADD \`teamuserTeamUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team\` ADD \`teamuserTeamUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`User\` ADD CONSTRAINT \`FK_0b166e86114d8ede4217604e357\` FOREIGN KEY (\`teamuserTeamUserId\`) REFERENCES \`sebackend\`.\`Team_User\`(\`team_user_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team\` ADD CONSTRAINT \`FK_aa070c758384c6b6f8a0e671ed4\` FOREIGN KEY (\`teamuserTeamUserId\`) REFERENCES \`sebackend\`.\`Team_User\`(\`team_user_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team\` DROP FOREIGN KEY \`FK_aa070c758384c6b6f8a0e671ed4\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`User\` DROP FOREIGN KEY \`FK_0b166e86114d8ede4217604e357\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team\` DROP COLUMN \`teamuserTeamUserId\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`User\` DROP COLUMN \`teamuserTeamUserId\``);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` ADD \`userPkAccountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` ADD \`teamPkTeamId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` ADD CONSTRAINT \`FK_fff1c035d94d3e1b296fc1c81e4\` FOREIGN KEY (\`userPkAccountId\`) REFERENCES \`sebackend\`.\`User\`(\`pkAccount_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sebackend\`.\`Team_User\` ADD CONSTRAINT \`FK_197a6cac4f1db393eb433dee591\` FOREIGN KEY (\`teamPkTeamId\`) REFERENCES \`sebackend\`.\`Team\`(\`pkTeam_Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
