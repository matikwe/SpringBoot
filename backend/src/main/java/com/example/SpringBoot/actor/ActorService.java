package com.example.SpringBoot.actor;

import com.example.SpringBoot.utils.ImageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
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

    public Actor addActor(Actor actor) {
        Optional<Actor> actorExist = actorRepository.checkExistActor(actor.getName(), actor.getSurname());
        if (actorExist.isPresent()) {
            throw new IllegalStateException("Actor :" + actor.getName() + " " + actor.getSurname() + " exist!");
        }
        actorRepository.save(actor);
        return actor;
    }

    public ResponseEntity deleteActor(Long actorId) {
        boolean exist = actorRepository.existsById(actorId);
        if (!exist) {
            throw new IllegalStateException("Actor with id: " + actorId + " does not exist !");
        }
        actorRepository.deleteById(actorId);
        return new ResponseEntity("Actor deleted successfully.", HttpStatus.OK);
    }

    @Transactional
    public Actor updateActor(Long actorId, Actor a, List<ImageModel> images) {
        Actor actor = getActor(actorId);

        if (a.getName() != null && a.getName().length() > 0 &&
                !Objects.equals(actor.getName(), a.getName())) {
            actor.setName(a.getName());
        }
        if (a.getSurname() != null && a.getSurname().length() > 0 &&
                !Objects.equals(actor.getSurname(), a.getSurname())) {
            actor.setSurname(a.getSurname());
        }
        if (!Arrays.equals(actor.getActorImage().get(0).getPicByte(), images.get(0).getPicByte())) {
            actor.setActorImage(images);
        }

        return actor;
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
