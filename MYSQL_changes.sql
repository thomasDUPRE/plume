-- 16/06/2017
ALTER TABLE collaborateur ADD column mot_de_passe varchar(50)
-- 16/02/2017
ALTER TABLE collaborateur ADD mot_de_passe varchar(255)

--17/02/2017
ALTER TABLE conge ADD column est_paye boolean not null;
ALTER TABLE conge ADD column id_etat_conge int;
ALTER TABLE conge ADD column part_matin boolean not null;
ALTER TABLE conge ADD column revient_matin boolean not null;
ALTER TABLE ligne_frais modify id_etat_ligne_frais int;
ALTER TABLE ligne_frais ADD constraint fk_ligne_frais4 foreign key (id_etat_ligne_frais) references etat_ligne_frais(id) on delete set null;
ALTER TABLE conge ADD constraint fk_conge foreign key (id_etat_conge) references etat_conge(id) on delete set null;
ALTER TABLE missions_collaborateurs ADD column date_fin_mission date NOT NULL;

--18/02/2017
ALTER table collaborateur add column id_role int ;
ALTER table collaborateur add constraint fk_collaborateur2 foreign key(id_role) references role(id) on delete set null ;
DROP table roles_collaborateurs;
Create table admin(
		 id int NOT NULL,
		 constraint pk_admin primary key(id),
		 constraint fk_admin foreign key(id ) references collaborateur(id) on delete cascade
 )ENGINE=INNODB;

Create table notification(

		 id int AUTO_INCREMENT,
		 contenu text not null,
		 date_notification datetime not NULL ,
		 vu boolean NOT NULL,
		 constraint pk_notification primary key(id),
		 constraint fk_notification foreign key(id) references collaborateur(id) on delete cascade
)ENGINE=INNODB;

ALTER table conge Add column motif varchar(50) NOT NULL;
ALTER table conge Add column id_demandeur int NOT NULL;
ALTER table conge Add constraint fk_conge2 foreign key(id_demandeur ) references collaborateur(id) on delete cascade ;
ALTER TABLE missions_collaborateurs ADD column date_debut_mission date NOT NULL;
ALTER TABLE missions_collaborateurs ADD constraint ck_missions_collaborateurs check (date_fin_mission>=date_debut_mission);
ALTER TABLE missions_collaborateurs DROP column date_mission ;
ALTER TABLE conge ADD constraint ck_conge check (date_fin>=date_debut);

-- 20/02 Thomas
alter table notification drop constraint fk_notification;
alter table notification add column id_collaborateur int not null;
alter table notification add constraint fk_id_collaborateur_n foreign key(id_collaborateur) references collaborateur(id);
alter table notification add column sujet varchar(255);

insert into service (nom) values ("COMPTABILITE"), ("INFO"), ("RH");
insert into role (nom) values ("Collaborateur"), ("Chef de service"), ("Dirigeant");

insert into collaborateur (nom, prenom, mail, telephone, id_service, nb_jours_restants, mot_de_passe, id_role)
values ("dupré", "thomas", "thomas.dupre@u-psud.fr", "-654", 1, 3, "thomas", 2),
        ("es-souabni", "karim", "karim.es-souabni@u-psud.fr", "-789", 3, 14, "karim", 2);

insert into notification(sujet, contenu, vu, date_notification, id_collaborateur) values
("Bienvenue sur Plume", "Nous vous souhaitons la bienvenue sur l'intranet Plume", false, NOW(), 11),
("Bienvenue sur Plume", "Nous vous souhaitons la bienvenue sur l'intranet Plume", false, NOW(), 12);
