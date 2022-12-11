package toure.kevser.quickdoc.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import toure.kevser.quickdoc.entities.Creneau;
public interface CreneauRepository extends JpaRepository<Creneau, Long> {

    List<Creneau> findByProfessionnelId(String professionnelId);
    List<Creneau> findByPatientId(String patientId);
    List<Creneau> findByIdAndPatientId(Long id, String patientId);
}
    
