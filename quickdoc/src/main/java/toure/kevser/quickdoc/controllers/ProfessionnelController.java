package toure.kevser.quickdoc.controllers;


import org.springframework.web.bind.annotation.RestController;

import toure.kevser.quickdoc.dao.ProfessionnelRepository;
import toure.kevser.quickdoc.entities.Professionnel;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/api")
public class ProfessionnelController {

    @Autowired
    ProfessionnelRepository professionnelRepository;

    // Get Professionnels
    @GetMapping("/professionnels")
    public ResponseEntity<List<Professionnel>> getProfessionnels(@RequestParam(required = false) String profession, @RequestParam(required = false) String adresse, @RequestParam(required = false) String nomOrPrenom) {
        try{
            List<Professionnel> professionnels = new ArrayList<Professionnel>();
            // Get all professionnels
            if (profession == null && adresse == null && nomOrPrenom == null) {
                professionnelRepository.findAll().forEach(professionnels::add);
            
            // Get professionnel by adresse
            } else if (profession == null && adresse != null && nomOrPrenom == null) {
                professionnelRepository.findByAdresseContaining(adresse).forEach(professionnels::add);
            
            // Get professionnel by profession
            } else if (adresse == null && profession != null && nomOrPrenom == null) {
                professionnelRepository.findByProfessionContaining(profession).forEach(professionnels::add);
            
            // Get professionnel by nomOrPrenom
            } else if (adresse == null && profession == null && nomOrPrenom != null) {
                professionnelRepository.SearchByNomOrPrenom(nomOrPrenom).forEach(professionnels::add);
            
            // Get professionnel by profession and adresse
            } else if (adresse != null && profession != null && nomOrPrenom == null) {
                professionnelRepository.findByProfessionAndAdresseContaining(profession, adresse).forEach(professionnels::add);
            }

            // Get professionnel by profession and nomOrPrenom
            else if (adresse == null && profession != null && nomOrPrenom != null) {
                professionnelRepository.findByProfessionContaining(profession).forEach(professionnels::add);
                List<Professionnel> professionnels2 = new ArrayList<Professionnel>();
                for (Professionnel professionnel : professionnels) {
                    if (professionnel.getNom().contains(nomOrPrenom) || professionnel.getPrenom().contains(nomOrPrenom)) {
                        professionnels2.add(professionnel);
                    }
                }
                professionnels = professionnels2;
            }

            // Get professionnel by adresse and nomOrPrenom
            else if (adresse != null && profession == null && nomOrPrenom != null) {
                professionnelRepository.findByAdresseContaining(adresse).forEach(professionnels::add);
                List<Professionnel> professionnels2 = new ArrayList<Professionnel>();
                for (Professionnel professionnel : professionnels) {
                    if (professionnel.getNom().contains(nomOrPrenom) || professionnel.getPrenom().contains(nomOrPrenom)) {
                        professionnels2.add(professionnel);
                    }
                }
                professionnels = professionnels2;
            }

            // Get profession by profession, adresse and nomOrPrenom
            else if (adresse != null && profession != null && nomOrPrenom != null) {
                professionnelRepository.findByProfessionAndAdresseContaining(profession, adresse).forEach(professionnels::add);
                List<Professionnel> professionnels2 = new ArrayList<Professionnel>();
                for (Professionnel professionnel : professionnels) {
                    if (professionnel.getNom().contains(nomOrPrenom) || professionnel.getPrenom().contains(nomOrPrenom)) {
                        professionnels2.add(professionnel);
                    }
                }
                professionnels = professionnels2;
            }

            // If no professionnels found
            if (professionnels.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(professionnels, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get Professionnel By Id
    @GetMapping("/professionnels/{id}")
    public ResponseEntity<Professionnel> getProfessionnelById(@PathVariable("id") String id){
        try{
            Optional<Professionnel> professionnel = professionnelRepository.findById(id);
            if(professionnel.isPresent()){
                return new ResponseEntity<>(professionnel.get(), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Create a new Professionnel
    @PostMapping("/professionnels")
    public ResponseEntity<Professionnel> createProfessionnel(@RequestBody Professionnel professionnel){
        try{
            // Set professionnel role
            professionnel.setRole("professionnel");
            // Add in the database
            Professionnel _professionnel = professionnelRepository.save(professionnel);

            return new ResponseEntity<>(_professionnel, HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update a Professionnel
    @PutMapping("/professionnels/{id}")
    public ResponseEntity<Professionnel> updateProfessionnel(@PathVariable("id") String id, @RequestBody Professionnel professionnel){
        try{
            Optional<Professionnel> professionnelData = professionnelRepository.findById(id);
            if(professionnelData.isPresent()){
                if(professionnelData.get().getRole().equals("professionnel")){
                    return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
                }

                professionnel.setCreneaux(professionnelData.get().getCreneaux()); // So that the creneaux are not lost
                Professionnel _professionnel = professionnelRepository.save(professionnel);
                return new ResponseEntity<>(_professionnel, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }catch(Exception e){
            System.out.println(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
