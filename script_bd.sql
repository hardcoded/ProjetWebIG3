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

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  pseudo VARCHAR(30) NOT NULL,
  mail VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  signup_date DATE NOT NULL,
  admin BOOLEAN NOT NULL,
  tokens INTEGER NOT NULL,
  rank SERIAL REFERENCES rank(id)
);

CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(200),
  helpers_min INTEGER,
  helpers_max INTEGER NOT NULL,
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
  helpers_min INTEGER,
  helpers_max INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  achievment INTEGER NOT NULL,
  rank_required SERIAL REFERENCES rank(id)
);

CREATE TABLE message (
  id SERIAL PRIMARY KEY,
  message VARCHAR(500) NOT NULL,
  date_post DATE,
  id_writer SERIAL REFERENCES account(id)
);

CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE forum (
  id_message SERIAL REFERENCES message(id),
  id_topic SERIAL REFERENCES topic(id),
  PRIMARY KEY (id_message, id_topic)
);

CREATE OR REPLACE FUNCTION rank_ctrl() RETURNS TRIGGER AS $rank_ctrl$
  DECLARE
  cpt_mess INTEGER;
  max_mess INTEGER;
  BEGIN
  SELECT INTO cpt_mess COUNT(*) FROM message
  WHERE id_writer = NEW.id_writer;
  SELECT INTO max_mess limit_posts FROM rank
  WHERE id = account.rank
  AND account.id = NEW.id_writer
  AND date_post BETWEEN CURRENT_DATE AND CURRENT_DATE - 7;

  IF cpt_mess <= max_mess THEN
    INSERT INTO message(message, id_writer) VALUES (NEW.message, NEW.id_writer);
  ELSE
    RAISE EXCEPTION 'Nombre maximal de message pour votre rang atteint (%) !', max_mess;
   END IF;
  END;
  $rank_ctrl$ LANGUAGE plpgsql;

CREATE TRIGGER check_rank_bfor_insrt BEFORE INSERT ON message
  FOR EACH ROW
  EXECUTE PROCEDURE rank_ctrl();

CREATE OR REPLACE FUNCTION max_particip_ctrl() RETURNS TRIGGER AS $max_particip_ctrl$
  DECLARE
    max_helpers INTEGER;
    helpers_registered INTEGER;
  BEGIN
    SELECT INTO helpers_registered COUNT(*) FROM participate
    WHERE id_project = NEW.id_project;
    SELECT INTO max_helpers helpers_max FROM project
    WHERE id_project = NEW.id_project;

    IF helpers_registered <= max_helpers THEN
      INSERT INTO participate VALUES (NEW.id_project, NEW.id_helper);
    ELSE
      RAISE EXCEPTION 'Nombre maximal de personnes sur le projet atteint (%) !', max_helpers;
    END IF;
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
