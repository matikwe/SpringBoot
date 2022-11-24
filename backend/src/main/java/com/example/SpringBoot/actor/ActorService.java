package com.example.SpringBoot.actor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ActorService {
    private final ActorRepository actorRepository;

    @Autowired
    public ActorService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    public List<Actor> getActors() {
        return actorRepository.findAll();
    }

    public void addActor(Actor actor) {
        Optional<Actor> actorExist = actorRepository.checkExistActor(actor.getName(), actor.getSurname());
        if (actorExist.isPresent()) {
            throw new IllegalStateException("Actor :" + actor.getName() + " " + actor.getSurname() + " exist!");
        }
        actorRepository.save(actor);
    }

    public void deleteActor(Long actorId) {
        boolean exist = actorRepository.existsById(actorId);
        if (!exist) {
            throw new IllegalStateException("Actor with id: " + actorId + " does not exist !");
        }
        actorRepository.deleteById(actorId);
    }

    @Transactional
    public void updateActor(Long actorId, String name, String surname) {
        Actor actor = getActor(actorId);

        if (name != null && name.length() > 0 &&
                !Objects.equals(actor.getName(), name)) {
            actor.setName(name);
        }

        if (surname != null && surname.length() > 0 &&
                !Objects.equals(actor.getSurname(), surname)) {
            actor.setSurname(surname);
        }
    }

    public byte[] getImage(Long actorId) {
        Actor actor = getActor(actorId);
        return actor.getActorImage().get(0).getPicByte();
    }

    private Actor getActor(Long actorId) {
        return actorRepository.findById(actorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Actor with id: " + actorId + " doesn't exist!"
                ));
    }
}
