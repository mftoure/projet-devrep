package toure.kevser.quickdoc.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "creneaux")
// We need this to prevent infinite recursion when serializing to JSON -> Creneau -> Patient -> Creneau -> ... , Professionnel -> Patient -> ...
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class, 
    property = "id")
public class Creneau implements Serializable{
    
    @Id
    @GeneratedValue
    private Long id;

    @JsonFormat(pattern = "dd-MM-yyyy'T'HH:mm", timezone="Europe/Paris")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creneauDate;

    private boolean reserve;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true) // We'll only have the id in the json response
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true) // We'll only have the id in the json response
    private Professionnel professionnel;

    public Creneau() {
    }

    public Creneau(Date creneauDate) {
        this.creneauDate = creneauDate;
        reserve = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreneauDate() {
        return creneauDate;
    }

    public void setCreneauDate(Date creneauDate) {
        this.creneauDate = creneauDate;
    }

    public boolean isReserve() {
        return reserve;
    }

    public void setReserve(boolean reserve) {
        this.reserve = reserve;
    }

   
    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Professionnel getProfessionnel() {
        return professionnel;
    }

    public void setProfessionnel(Professionnel professionnel) {
        this.professionnel = professionnel;
    }
}
