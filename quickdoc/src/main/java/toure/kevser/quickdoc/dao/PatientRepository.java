package toure.kevser.quickdoc.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import toure.kevser.quickdoc.entities.Patient;
public interface PatientRepository extends JpaRepository<Patient, String> {

}
    
