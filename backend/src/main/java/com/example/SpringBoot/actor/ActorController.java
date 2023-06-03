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
import java.util.Objects;

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
    public Actor addActor(
            @RequestPart("actor") String actor,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        Actor actorJson = Utils.getActorJson(actor);
        try {
            List<ImageModel> images = Utils.uploadImage(imageFile);
            actorJson.setActorImage(images);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return actorService.addActor(actorJson);
    }

    @DeleteMapping(path = "{actorId}")
    public ResponseEntity deleteActor(
            @PathVariable("actorId") Long actorId) {
        return actorService.deleteActor(actorId);
    }

    @PutMapping(path = "{actorId}")
    public Actor updateActor(
            @PathVariable("actorId") Long actorId,
            @RequestPart("actor") String actor,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        Actor actorJson = Utils.getActorJson(actor);
        List<ImageModel> images = null;
        try {
            images = Utils.uploadImage(imageFile);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return actorService.updateActor(actorId, actorJson, images);
    }

    @GetMapping(path = "getImage/{actorId}")
    public ResponseEntity<?> getImage(@PathVariable("actorId") Long actorId) {
        byte[] image = actorService.getImage(actorId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
}
