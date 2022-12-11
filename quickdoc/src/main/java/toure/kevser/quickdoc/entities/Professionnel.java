package toure.kevser.quickdoc.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


@Entity
@Table(name = "professionnels")
// We need this to prevent infinite recursion when serializing to JSON -> Professionnel -> Creneau -> Professionnel -> ...
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "id")
public class Professionnel extends Utilisateur {
    
    private String profession;
    private String horaire;
    private String adresse;
    private String telephone;

    @OneToMany(
        mappedBy = "professionnel",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Creneau> creneaux = new ArrayList<>();
    public Professionnel() {
    }

    public Professionnel(String id, String nom, String prenom, String email, String profession, String horaire, String adresse, String telephone, String role) {
        super(id,nom, prenom, email, role);
        this.profession = profession;
        this.horaire = horaire;
        this.adresse = adresse;
        this.telephone = telephone;
        // this.photo = photo;
    }

    /** Generate getters and setters */
    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getHoraire() {
        return horaire;
    }

    public void setHoraire(String horaire) {
        this.horaire = horaire;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }



    public List<Creneau> getCreneaux() {
        return creneaux;
    }

    public void setCreneaux(List<Creneau> creneaux) {
        this.creneaux = creneaux;
    }

    @Override
    public String toString() {
        return "Professionnel [adresse=" + adresse + ", horaire=" + horaire + ", profession=" + profession + ", telephone="
                + telephone + ", toString()=" + super.toString() + "]";
    }
    
}
    
