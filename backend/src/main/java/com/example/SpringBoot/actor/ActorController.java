package com.example.SpringBoot.actor;

import com.example.SpringBoot.utils.ImageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/actor")
public class ActorController {

    private final ActorService actorService;

    @Autowired
    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping
    public List<Actor> getActors() {
        return actorService.getActors();
    }

    @PostMapping(path = "addActor")
    public void addActor(
            @RequestPart("actor") Actor actor,
            @RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<ImageModel> images = uploadImage(file);
            actor.setActorImage(images);
            actorService.addActor(actor);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @DeleteMapping(path = "{actorId}")
    public void deleteActor(
            @PathVariable("actorId") Long actorId) {
        actorService.deleteActor(actorId);
    }

    @PutMapping(path = "{actorId}")
    public void updateActor(
            @PathVariable("actorId") Long actorId,
            @RequestParam String name,
            @RequestParam String surname) {
        actorService.updateActor(actorId, name, surname);
    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file : multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }
        return imageModels;
    }
}
