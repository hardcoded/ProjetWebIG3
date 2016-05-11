/* Create ranks */
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Père fondateur', 'Rang réservé aux fondateurs d''Infotech', 42000000, 42000);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Maitre Jedi', 'Rang ultime', 160, 130);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Padawan', 'Dernier rang avant le rang ultime', 120, 100);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Disciple du 1e cercle', 'Rang maximal des disciples', 80, 70);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Disciple du 2e cercle', 'Disciple moyen', 60, 50);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Disciple du 3e cercle', 'Rang de base des disciples', 40, 30);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Initié du 1er cercle', 'Rang maximal pour les initiés', 20, 15);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Initié du 2e cercle', 'Initié moyen', 10, 10);
INSERT INTO rank(name, description, tokens_required, limit_posts) VALUES ('Initié du 3e cercle', 'Rang de base', 0, 5);

/* Create sections */
INSERT INTO section(acronym, name) VALUES ('ENR', 'Énergétique - énergies renouvelables');
INSERT INTO section(acronym, name) VALUES ('IG', 'Informatique et gestion');
INSERT INTO section(acronym, name) VALUES ('GBA', 'Génie biologique et agroalimentaire');
INSERT INTO section(acronym, name) VALUES ('MAT', 'Matériaux');
INSERT INTO section(acronym, name) VALUES ('MI', 'Mécanique et interactions');
INSERT INTO section(acronym, name) VALUES ('MEA', 'Microélectronique et automatique');
INSERT INTO section(acronym, name) VALUES ('STE', 'Sciences et technologies de l''eau');

/* Create accounts */
INSERT INTO account(first_name, last_name, mail, pseudo, signup_date, admin, tokens, rank, section) VALUES ('Johan', 'Brunet', 'brunet.johan.23@gmail.com', 'JohanBrunet', CURRENT_DATE, true, '42000000', 1, 2);
INSERT INTO account(first_name, last_name, mail, pseudo, signup_date, admin, tokens, rank, section) VALUES ('Théo', 'Gauchoux', 't.g@mail.com', 'TGauchoux', CURRENT_DATE, false, '42000000', 1, 2);
INSERT INTO account(first_name, last_name, mail, pseudo, signup_date, admin, tokens, rank, section) VALUES ('Charlène', 'Pizzoni', 'c.p@mail.com', 'CPizzoni', CURRENT_DATE, false, '30', 7, 2);
INSERT INTO account(first_name, last_name, mail, pseudo, signup_date, admin, tokens, rank, section) VALUES ('Mehdi', 'Fakihani', 'm.f@mail.com', 'MFakihani', CURRENT_DATE, false, '0', 9, 2);
INSERT INTO account(first_name, last_name, mail, pseudo, signup_date, admin, tokens, rank, section) VALUES ('Quentin', 'Bouygues', 'q.b@mail.com', 'QBouygues', CURRENT_DATE, false, '65', 5, 2);

/* Create projects */
INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ('Infotech', 'Site web du club d''informatique de Polytech Montpellier', '1', '2016-04-30', '2016-05-16', '30', 3, 1);
INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ('Polythèque', 'Projet Java de gestion de ludothèque', '5', '2015-10-20', '2016-01-20', '80', 5, 1);
INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ('Jarvis', 'Just A Rather Intelligent System', '1', '2016-04-30', '2016-05-16', '60', 2, 2);
INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ('G2ATools', 'Application web pour alertes G2A', '1', '2016-04-30', '2016-05-16', '30', 3, 5);

/* Create helpers */
INSERT INTO participate(id_project, id_helper) VALUES (1, 1);
INSERT INTO participate(id_project, id_helper) VALUES (2, 1);
INSERT INTO participate(id_project, id_helper) VALUES (3, 2);
INSERT INTO participate(id_project, id_helper) VALUES (4, 5);
