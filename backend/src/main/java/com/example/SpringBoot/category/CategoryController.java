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
    public void addCategory(
            @RequestPart String category,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        try {
            List<ImageModel> images = Utils.uploadImage(imageFile);
            Category categoryJson = Utils.getCategoryJson(category);
            categoryJson.setCategoryImage(images);
            categoryService.addCategory(categoryJson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @DeleteMapping(path = "{categoryId}")
    public ResponseEntity deleteCategory(
            @PathVariable("categoryId") Long categoryId) {
        return categoryService.deleteCategory(categoryId);
    }

    @PutMapping(path = "{categoryId}")
    public void updateCategory(
            @PathVariable("categoryId") Long categoryId,
            @RequestParam String category) {
        categoryService.updateCategory(categoryId, category);
    }
}
