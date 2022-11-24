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
    public void addDirector(
            @RequestPart("director") String director,
            @RequestPart("imageFile") MultipartFile[] imageFile) {

        try {
            List<ImageModel> images = Utils.uploadImage(imageFile);
            Director directorJson = Utils.getDirectorJson(director);
            directorJson.setDirectorImage(images);
            directorService.addDirector(directorJson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @DeleteMapping(path = "{directorId}")
    public void deleteDirector(
            @PathVariable("directorId") Long directorId) {
        directorService.deleteDirector(directorId);
    }

    @PutMapping(path = "{directorId}")
    public void updateDirector(
            @PathVariable("directorId") Long directorId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname) {
        directorService.updateDirector(directorId, name, surname);
    }

    @GetMapping(path = "getImage/{directorId}")
    public ResponseEntity<?> getImage(@PathVariable("directorId") Long directorId) {
        byte[] image = directorService.getImage(directorId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
}
