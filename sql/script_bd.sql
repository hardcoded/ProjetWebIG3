/*CREATE DATABASE infotech IF NOT EXISTS
  WITH OWNER = johan
       ENCODING = 'UTF8'
       TABLESPACE = pg_default;
*/

CREATE TABLE rank (
 id SERIAL PRIMARY KEY,
 name VARCHAR(30) NOT NULL,
 description VARCHAR(200),
 tokens_required INTEGER NOT NULL
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
  max_helpers INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  achievment INTEGER,
  rank_required SERIAl REFERENCES rank(id),
  owner SERIAL REFERENCES account(id)
);

CREATE TABLE participate (
  id_project SERIAL REFERENCES project(id),
  id_helper SERIAL REFERENCES account(id),
  PRIMARY KEY (id_project, id_helper)
);

/*
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
*/

CREATE OR REPLACE FUNCTION rank_ctrl() RETURNS TRIGGER AS $rank_ctrl$
  DECLARE
    rank_check INTEGER;
    actual_rank INTEGER;
  BEGIN
    SELECT rank_required INTO rank_check FROM project pr, participate
    WHERE pr.id = NEW.id_project;
    SELECT rank INTO actual_rank FROM account a, participate
    WHERE a.id = NEW.id_helper;
    IF rank_check <= actual_rank THEN
      RAISE EXCEPTION 'Votre rang ne vous permet pas de participer à ce projet !';
    END IF;
    RETURN NEW;
  END;
$rank_ctrl$ LANGUAGE plpgsql;

CREATE TRIGGER check_rank_bfor_insrt BEFORE INSERT ON participate
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
