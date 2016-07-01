/* Create ranks */
INSERT INTO rank(name, description, tokens_required) VALUES ('Père fondateur', 'Rang réservé aux fondateurs d''Infotech', 42000000);
INSERT INTO rank(name, description, tokens_required) VALUES ('Maitre Jedi', 'Rang ultime', 160);
INSERT INTO rank(name, description, tokens_required) VALUES ('Padawan', 'Dernier rang avant le rang ultime', 120);
INSERT INTO rank(name, description, tokens_required) VALUES ('Disciple du 1e cercle', 'Rang maximal des disciples', 80);
INSERT INTO rank(name, description, tokens_required) VALUES ('Disciple du 2e cercle', 'Disciple moyen', 60);
INSERT INTO rank(name, description, tokens_required) VALUES ('Disciple du 3e cercle', 'Rang de base des disciples', 40);
INSERT INTO rank(name, description, tokens_required) VALUES ('Initié du 1er cercle', 'Rang maximal pour les initiés', 20);
INSERT INTO rank(name, description, tokens_required) VALUES ('Initié du 2e cercle', 'Initié moyen', 10);
INSERT INTO rank(name, description, tokens_required) VALUES ('Initié du 3e cercle', 'Rang de base', 0);

/* Create sections */
INSERT INTO section(acronym, name) VALUES ('ENR', 'Énergétique - énergies renouvelables');
INSERT INTO section(acronym, name) VALUES ('IG', 'Informatique et gestion');
INSERT INTO section(acronym, name) VALUES ('GBA', 'Génie biologique et agroalimentaire');
INSERT INTO section(acronym, name) VALUES ('MAT', 'Matériaux');
INSERT INTO section(acronym, name) VALUES ('MI', 'Mécanique et interactions');
INSERT INTO section(acronym, name) VALUES ('MEA', 'Microélectronique et automatique');
INSERT INTO section(acronym, name) VALUES ('STE', 'Sciences et technologies de l''eau');

/* Create accounts */
INSERT INTO account(first_name, last_name, mail, pseudo, password, admin, tokens, rank, section) VALUES ('Johan', 'BRUNET', 'brunet.johan.23@gmail.com', 'Johanonyme', 'sha1$5c9ac5ab$1$7a19b172fdc642c780684b7a8a22feef5d57aefa', true, 0, '1', '2');
INSERT INTO account(first_name, last_name, mail, pseudo, password, admin, tokens, rank, section) VALUES ('User', 'Test', 'user.test@mail.fr', 'testuser', 'sha1$96c3a714$1$fbb287a4f0d418d6ac46a18d5b2548e72d71eade', false, 0, '9', '2');
INSERT INTO account(first_name, last_name, mail, pseudo, password, admin, tokens, rank, section) VALUES ('Almighty', 'admin', 'admin@mail.fr', 'admin', 'sha1$5c9ac5ab$1$7a19b172fdc642c780684b7a8a22feef5d57aefa', true, 0, '9', '2');

/* Create projects */
INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ('Infotech', 'Site web du club d''informatique de Polytech Montpellier', '1', '2016-04-30', '2016-05-16', '30', 3, 1);
INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ('Test', 'Mon projet test à supprimer', '3', '2016-04-30', '2016-05-16', '10', 8, 1);
INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ('Test', 'test modif proj', '3', '2016-04-30', '2016-05-16', '10', 8, 2);


/* Create helpers */
INSERT INTO participate(id_project, id_helper) VALUES (1, 1);
