package toure.kevser.quickdoc.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import toure.kevser.quickdoc.entities.Professionnel;
public interface ProfessionnelRepository extends JpaRepository<Professionnel, String> {
    List<Professionnel> findByAdresseContaining(String adresse);
    List<Professionnel> findByProfessionContaining(String profession);
    List <Professionnel> findByProfessionAndAdresseContaining(String profession, String adresse);
    @Query("Select p from Professionnel p where lower(p.nom) like %?1% or lower(p.prenom) like %?1%")
    List<Professionnel> SearchByNomOrPrenom(String nomOrPrenom);
}
    
