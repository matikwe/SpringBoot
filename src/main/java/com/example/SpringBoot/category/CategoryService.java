package com.example.SpringBoot.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public void addCategory(Category category) {
        Optional<Category> categoryExist = categoryRepository.checkExistCategory(category.getCategory());
        if (categoryExist.isPresent()) {
            throw new IllegalStateException("Category :" + category.getCategory() + " exist!");
        }
        categoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) {
        boolean exist = categoryRepository.existsById(categoryId);
        if (!exist) {
            throw new IllegalStateException("Category with id: " + categoryId + " does not exist !");
        }
        categoryRepository.deleteById(categoryId);
    }

    @Transactional
    public void updateCategory(Long categoryId, String category) {
        Category categoryObject = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException(
                        "Category with id: " + categoryId + " doesn't exist!"
                ));

        if (category != null && category.length() > 0 &&
                !Objects.equals(categoryObject.getCategory(), category)) {
            categoryObject.setCategory(category);
        }
    }
}
