package com.example.SpringBoot.category;

import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.utils.ImageModel;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Category")
@Table(
        name = "category"
)
public class Category {
    @Id
    @SequenceGenerator(name = "category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    private Long id;
    private String category;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "category_images",
            joinColumns = {
                    @JoinColumn(name = "id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    }
    )
    private List<ImageModel> categoryImage;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Movie> movie;

    public Category() {
    }

    public Category(String category) {
        this.category = category;
    }

    public List<ImageModel> getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryImage(List<ImageModel> categoryImage) {
        this.categoryImage = categoryImage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
