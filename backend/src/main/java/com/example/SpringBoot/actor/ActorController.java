package com.example.SpringBoot.actor;

import com.example.SpringBoot.utils.ImageModel;
import com.example.SpringBoot.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
            @RequestPart("actor") String actor,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        try {
            List<ImageModel> images = Utils.uploadImage(imageFile);
            Actor actorJson = Utils.getActorJson(actor);
            actorJson.setActorImage(images);
            actorService.addActor(actorJson);
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

    @GetMapping(path = "getImage/{actorId}")
    public ResponseEntity<?> getImage(@PathVariable("actorId") Long actorId) {
        byte[] image = actorService.getImage(actorId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
}
