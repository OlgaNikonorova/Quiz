import { Migration } from '@mikro-orm/migrations';

export class Migration20250213084020 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `quiz` (`id` integer not null primary key autoincrement, `title` text not null, `description` text not null, `preview` text not null);');

    this.addSql('create table `question` (`id` integer not null primary key autoincrement, `question` text not null, `image` text null, `answers` json not null, `correct_answer` integer not null, `quiz_id` integer not null, constraint `question_quiz_id_foreign` foreign key(`quiz_id`) references `quiz`(`id`) on update cascade);');
    this.addSql('create index `question_quiz_id_index` on `question` (`quiz_id`);');

    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `username` text not null, `password` text not null);');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');

    this.addSql('create table `answer` (`question_id` integer not null, `user_id` integer not null, `answer` integer not null, constraint `answer_question_id_foreign` foreign key(`question_id`) references `question`(`id`) on update cascade, constraint `answer_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade, primary key (`question_id`, `user_id`));');
    this.addSql('create index `answer_question_id_index` on `answer` (`question_id`);');
    this.addSql('create index `answer_user_id_index` on `answer` (`user_id`);');
  }

}
