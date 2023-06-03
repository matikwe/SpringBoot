package com.example.SpringBoot.utils;

import com.example.SpringBoot.actor.Actor;
import com.example.SpringBoot.category.Category;
import com.example.SpringBoot.director.Director;
import com.example.SpringBoot.movie.Movie;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Utils {
    public static List<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        List<ImageModel> imageModels = new ArrayList<>();

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

    public static Movie getMovieJson(String movie) {
        Movie movieJson = new Movie();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            movieJson = objectMapper.readValue(movie, Movie.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return movieJson;
    }

    public static Director getDirectorJson(String director) {
        Director directorJson = new Director();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            directorJson = objectMapper.readValue(director, Director.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return directorJson;
    }

    public static Actor getActorJson(String actor) {
        Actor actorJson = new Actor();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            actorJson = objectMapper.readValue(actor, Actor.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return actorJson;
    }

    public static Category getCategoryJson(String category) {
        Category categoryJson = new Category();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            categoryJson = objectMapper.readValue(category, Category.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return categoryJson;
    }
}
