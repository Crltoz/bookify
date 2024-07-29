package dev.crltoz.bookify.category;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(ObjectId id) {
        return categoryRepository.findById(id);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public void removeProductFromCategory(ObjectId categoryId, ObjectId productId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            return;
        }
        category.getProducts().remove(productId.toHexString());
        categoryRepository.save(category);
    }

    public void addProductToCategory(ObjectId categoryId, ObjectId productId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            return;
        }
        category.getProducts().add(productId.toHexString());
        categoryRepository.save(category);
    }

    public void deleteCategory(ObjectId id) {
        categoryRepository.deleteById(id);
    }
}
