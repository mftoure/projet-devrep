package toure.kevser.quickdoc.controllers;


import org.springframework.web.bind.annotation.RestController;

import toure.kevser.quickdoc.dao.PatientRepository;
import toure.kevser.quickdoc.dao.ProfessionnelRepository;
import toure.kevser.quickdoc.entities.Patient;
import toure.kevser.quickdoc.entities.Professionnel;
import toure.kevser.quickdoc.entities.Utilisateur;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/api")
public class PatientController {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    ProfessionnelRepository professionnelRepository; // on veut mettre en place un endpoint /utilisateurs/id qui retourne un utilisateur que ça soit un patient ou un professionnel

    // Get All Patients
    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients(){
        try{
            return new ResponseEntity<>(patientRepository.findAll(), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get Patient By Id
    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") String id){
        try{
            Optional<Patient> patient = patientRepository.findById(id);
            if(patient.isPresent()){
                return new ResponseEntity<>(patient.get(), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Create a new Patient
    @PostMapping("/patients")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient){
        try{
           // set the role to patient
            patient.setRole("patient");
            // Add in database
            Patient _patient = patientRepository.save(patient);
            
            return new ResponseEntity<>(_patient, HttpStatus.CREATED);
        }
        catch(Exception e){
            System.out.println(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update a Patient
    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable("id") String id, @RequestBody Patient patient){
        try{
            Optional<Patient> patientData = patientRepository.findById(id);
            if(patientData.isPresent()){
                // check if the user is a patient
                if(!patientData.get().getRole().equals("patient"))
                    return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
                
                    patient.setCreneaux(patientData.get().getCreneaux()); // So that the creneaux are not lost
                Patient _patient = patientRepository.save(patient);
                return new ResponseEntity<>(_patient, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get utilisateur: que ça soit un patient ou un medecin
    @GetMapping("/utilisateurs/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable("id") String id){
        try{
            Optional<Patient> patient = patientRepository.findById(id);
            if(patient.isPresent()){
                return new ResponseEntity<>(patient.get(), HttpStatus.OK);
            }
            Optional<Professionnel> professionnel = professionnelRepository.findById(id);
            if(professionnel.isPresent()){
                return new ResponseEntity<>(professionnel.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   

}
