package toure.kevser.quickdoc.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;



@Entity
@Table(name = "patients")

// We need this to prevent infinite recursion when serializing to JSON -> Patient -> Creneau -> Patient -> ...
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "id")
public class Patient extends Utilisateur {
    
    @OneToMany(
        mappedBy = "patient",
        orphanRemoval = true
    )
    private List<Creneau> creneaux = new ArrayList<>();
    
    public Patient() {
    }

    public Patient(String id, String nom, String prenom, String email, String role) {
        super(id,nom, prenom, email, role);
    }

    public List<Creneau> getCreneaux() {
        return creneaux;
    }

    public void setCreneaux(List<Creneau> creneaux) {
        this.creneaux = creneaux;
    }

    @Override
    public String toString() {
        return "Patient [toString()=" + super.toString() + "]";
    }
}
