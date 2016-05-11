/*CREATE DATABASE infotech IF NOT EXISTS
  WITH OWNER = johan
       ENCODING = 'UTF8'
       TABLESPACE = pg_default;
*/

CREATE TABLE rank (
 id SERIAL PRIMARY KEY,
 name VARCHAR(30) NOT NULL,
 description VARCHAR(200),
 tokens_required INTEGER NOT NULL,
 limit_posts INTEGER NOT NULL
);

CREATE TABLE section (
 id SERIAL PRIMARY KEY,
 acronym VARCHAR(5) NOT NULL,
 name VARCHAR(50) NOT NULL
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  mail VARCHAR(50) NOT NULL,
  pseudo VARCHAR(30) NOT NULL,
  signup_date DATE NOT NULL,
  admin BOOLEAN NOT NULL,
  tokens INTEGER NOT NULL,
  rank SERIAL REFERENCES rank(id),
  section SERIAL REFERENCES section(id)
);

CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(200),
  min_helpers INTEGER,
  max_helpers INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  achievment INTEGER,
  rank_required SERIAl REFERENCES rank(id)
);

CREATE TABLE participate (
  id_project SERIAL REFERENCES project(id),
  id_helper SERIAL REFERENCES account(id),
  PRIMARY KEY (id_project, id_helper)
);

CREATE TABLE project_history (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(200),
  max_helpers INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  achievment INTEGER NOT NULL,
  rank_required SERIAL REFERENCES rank(id)
);

CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE message (
  id SERIAL PRIMARY KEY,
  message VARCHAR(500) NOT NULL,
  date_post DATE,
  writer SERIAL REFERENCES account(id),
  topic SERIAL REFERENCES topic(id)
);

CREATE OR REPLACE FUNCTION rank_ctrl() RETURNS TRIGGER AS $rank_ctrl$
  DECLARE
  cpt_mess INTEGER;
  max_mess INTEGER;
  BEGIN
  SELECT COUNT(*) INTO cpt_mess FROM message
  WHERE writer = NEW.writer
  AND date_post BETWEEN CURRENT_DATE-7 AND CURRENT_DATE;
  SELECT limit_posts INTO max_mess FROM rank r, account a
  WHERE r.id = a.rank
  AND a.id = NEW.writer;
  /*RAISE NOTICE 'Nombre de messages postés : %', cpt_mess;
  RAISE NOTICE 'Nombre max de messages : %', max_mess;*/
  IF cpt_mess >= max_mess THEN /* le compteur démarre à 0 */
    RAISE EXCEPTION 'Nombre maximal de message pour votre rang atteint (%) !', max_mess;
  END IF;
  RETURN NEW;
END;
$rank_ctrl$ LANGUAGE plpgsql;

CREATE TRIGGER check_rank_bfor_insrt BEFORE INSERT ON message
  FOR EACH ROW
  EXECUTE PROCEDURE rank_ctrl();

CREATE OR REPLACE FUNCTION max_particip_ctrl() RETURNS TRIGGER AS $max_particip_ctrl$
DECLARE
  max INTEGER;
  helpers_registered INTEGER;
BEGIN
  SELECT COUNT(*) INTO helpers_registered FROM participate
  WHERE id_project = NEW.id_project;
  SELECT max_helpers INTO max FROM project
  WHERE id = NEW.id_project;
  IF helpers_registered >= max THEN
    RAISE EXCEPTION 'Nombre maximal de personnes sur le projet atteint (%) !', max;
  END IF;
  RETURN NEW;
END;
$max_particip_ctrl$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_particip_bfor_insrt BEFORE INSERT ON participate
  FOR EACH ROW
  EXECUTE PROCEDURE max_particip_ctrl();

/*
CREATE TABLE event ()
CREATE TABLE event_history ()
CREATE TABLE inscription ()
CREATE TABLE team ()
CREATE TABLE hackaton ()
CREATE TABLE lan ()
CREATE TABLE game ()
CREATE TABLE goodie ()
CREATE TABLE sponsor ()
*/
