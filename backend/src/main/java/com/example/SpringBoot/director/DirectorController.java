package com.example.SpringBoot.director;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
            @RequestBody Director director) {
        directorService.addDirector(director);
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
}
