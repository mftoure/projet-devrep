package toure.kevser.quickdoc.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import toure.kevser.quickdoc.dao.PatientRepository;
import toure.kevser.quickdoc.dao.ProfessionnelRepository;
import toure.kevser.quickdoc.dao.CreneauRepository;
import toure.kevser.quickdoc.entities.Creneau;
import toure.kevser.quickdoc.entities.Patient;
import toure.kevser.quickdoc.entities.Professionnel;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/api")
public class CreneauController {

    @Autowired
    CreneauRepository creneauRepository;

    @Autowired
    ProfessionnelRepository professionnelRepository;

    @Autowired
    PatientRepository patientRepository;

    // Get all creneaux

    @GetMapping("/creneaux")
    public ResponseEntity<List<Creneau>> getRdvs(@RequestParam(required = false) String professionnel_id,
            @RequestParam(required = false) String patient_id) {
        try {
            List<Creneau> creneaux = new ArrayList<Creneau>();

            // Get all creneaux
            if (professionnel_id == null && patient_id == null) {
                creneauRepository.findAll().forEach(creneaux::add);

                // Get creneaux by professionnel_id -> rdvs et disponibilites
            } else if (professionnel_id != null && patient_id == null) {
                creneauRepository.findByProfessionnelId(professionnel_id).forEach(creneaux::add);

                // Get creneaux by patient_id -> rdvs
            } else if (professionnel_id == null && patient_id != null) {
                creneauRepository.findByPatientId(patient_id).forEach(creneaux::add);
            }

            if (creneaux.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(creneaux, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get Creneau by id
    @GetMapping("/creneaux/{id}")
    public ResponseEntity<Creneau> getRdvById(@PathVariable("id") long id) {
        try {
            Optional<Creneau> creneauData = creneauRepository.findById(id);

            if (creneauData.isPresent()) {
                return new ResponseEntity<>(creneauData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Create a new creneau -> Only professionnels can create creneaux
    @PostMapping("/professionnels/{professionnel_id}/creneaux")
    public ResponseEntity<Creneau> createRdv(@PathVariable("professionnel_id") String professionnel_id,
            @RequestBody Creneau creneau) {
        try {
            Optional<Professionnel> professionnel = professionnelRepository.findById(professionnel_id);
            if (professionnel.isPresent()) {
                if(!professionnel.get().getRole().equals("professionnel"))
                    return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
                
                    creneau.setProfessionnel(professionnel.get());
                Creneau _creneau = creneauRepository.save(creneau);
                return new ResponseEntity<Creneau>(_creneau, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a creneau -> Only professionnels can delete creneaux
    @DeleteMapping("/creneaux/{id}")
    public ResponseEntity<HttpStatus> deleteRdv(@PathVariable("id") long id) {
        try {
            creneauRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Reserver un creneau -> Only patients can reserve creneaux
    @PostMapping("/patients/{patient_id}/creneaux/{creneau_id}")
    public ResponseEntity<Creneau> reserveRdv(@PathVariable("patient_id") String patient_id,
            @PathVariable("creneau_id") long creneau_id) {
        try {
            Optional<Patient> patientData = patientRepository.findById(patient_id);
            if (!patientData.get().getRole().equals("patient"))
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
                
            Optional<Creneau> creneauData = creneauRepository.findById(creneau_id);
            if (creneauData.isPresent()) {
                Creneau _creneau = creneauData.get();
                // Si c'est déja réservé
                if (_creneau.isReserve())
                    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
                _creneau.setPatient(patientRepository.findById(patient_id).get());
                _creneau.setReserve(true);
                return new ResponseEntity<Creneau>(creneauRepository.save(_creneau), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // Annuler un rdv -> Only patients can cancel creneaux
    @PostMapping("/patients/{patient_id}/creneaux/{creneau_id}/annuler")
    public ResponseEntity<Creneau> cancelRdv(@PathVariable("patient_id") String patient_id,
            @PathVariable("creneau_id") long creneau_id) {
        try {
            Optional<Patient> patientData = patientRepository.findById(patient_id);
            if (!patientData.get().getRole().equals("patient"))
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

            List<Creneau> creneauData = creneauRepository.findByIdAndPatientId(creneau_id, patient_id);
            if (!creneauData.isEmpty()) {
                Creneau _creneau = creneauData.get(0);
                _creneau.setPatient(null);
                _creneau.setReserve(false);
                return new ResponseEntity<Creneau>(creneauRepository.save(_creneau), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}