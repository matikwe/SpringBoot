package com.example.SpringBoot.director;

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
            @RequestPart("director") Director director,
            @RequestPart("imageFile") MultipartFile[] file) {

        try {
            Set<ImageModel> images = uploadImage(file);
            director.setDirectorImage(images);
            directorService.addDirector(director);
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
