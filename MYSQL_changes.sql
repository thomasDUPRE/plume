<<<<<<< HEAD
-- 16/06/2017
ALTER TABLE collaborateur ADD column mot_de_passe varchar(50)
=======
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
ALTER TABLE missions_collaborateurs ADD column date_date_mission date NOT NULL;
ALTER TABLE missions_collaborateurs ADD column date_fin_mission date NOT NULL;
>>>>>>> af8a7c4ffc8ed65ff2608125574f23f5a23a7fbe
