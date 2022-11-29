package com.example.SpringBoot.director;

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
@RequestMapping(path = "api/v1/director")
public class DirectorController {
    private final DirectorService directorService;

    @Autowired
    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping
    public List<Director> getDirectors() {
        return directorService.getDirectors();
    }

    @PostMapping(path = "addDirector")
    public Director addDirector(
            @RequestPart("director") String director,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        Director directorJson = Utils.getDirectorJson(director);
        try {
            List<ImageModel> images = Utils.uploadImage(imageFile);
            directorJson.setDirectorImage(images);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return directorService.addDirector(directorJson);
    }

    @DeleteMapping(path = "{directorId}")
    public ResponseEntity deleteDirector(
            @PathVariable("directorId") Long directorId) {
        return directorService.deleteDirector(directorId);
    }

    @PutMapping(path = "{directorId}")
    public Director updateDirector(
            @PathVariable("directorId") Long directorId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname) {
        return directorService.updateDirector(directorId, name, surname);
    }

    @GetMapping(path = "getImage/{directorId}")
    public ResponseEntity<?> getImage(@PathVariable("directorId") Long directorId) {
        byte[] image = directorService.getImage(directorId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
}
