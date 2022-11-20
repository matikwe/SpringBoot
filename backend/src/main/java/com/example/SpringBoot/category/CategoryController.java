package com.example.SpringBoot.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
            @RequestBody Category category) {
        categoryService.addCategory(category);
    }

    @DeleteMapping(path = "{categoryId}")
    public void deleteCategory(
            @PathVariable("categoryId") Long categoryId){
        categoryService.deleteCategory(categoryId);
    }

    @PutMapping(path = "{categoryId}")
    public void updateCategory(
            @PathVariable("categoryId") Long categoryId,
            @RequestParam String category){
        categoryService.updateCategory(categoryId, category);
    }
}
