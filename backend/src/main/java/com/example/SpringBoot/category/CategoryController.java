package com.example.SpringBoot.category;

import com.example.SpringBoot.utils.ImageModel;
import com.example.SpringBoot.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/category")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getCategory() {
        return categoryService.getCategories();
    }

    @PostMapping(path = "addCategory")
    public Category addCategory(
            @RequestPart String category,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        Category categoryJson = Utils.getCategoryJson(category);
        try {
            List<ImageModel> images = Utils.uploadImage(imageFile);
            categoryJson.setCategoryImage(images);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return categoryService.addCategory(categoryJson);
    }

    @DeleteMapping(path = "{categoryId}")
    public ResponseEntity deleteCategory(
            @PathVariable("categoryId") Long categoryId) {
        return categoryService.deleteCategory(categoryId);
    }

    @PutMapping(path = "{categoryId}")
    public Category updateCategory(
            @PathVariable("categoryId") Long categoryId,
            @RequestPart String category,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        Category categoryJson = Utils.getCategoryJson(category);
        List<ImageModel> images = null;
        try {
            images = Utils.uploadImage(imageFile);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return categoryService.updateCategory(categoryId, categoryJson, images);
    }
}
