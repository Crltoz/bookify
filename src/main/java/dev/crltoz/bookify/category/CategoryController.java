package dev.crltoz.bookify.category;

import dev.crltoz.bookify.util.JwtUtil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Category>> allCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("/add")
    public ResponseEntity<Optional<Category>> addCategory(@RequestBody CreateCategoryRequest category, @RequestHeader("Authorization") String token) {
        if (!jwtUtil.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // check if exists category with same name
        if (categoryService.getAllCategories().stream().anyMatch(c -> c.getName().equalsIgnoreCase(category.getName()))) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }

        Category newCategory = new Category(category.getName(), category.getDescription(), category.getImage());
        return new ResponseEntity<>(Optional.ofNullable(categoryService.save(newCategory)), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable ObjectId id, @RequestHeader("Authorization") String token) {
        if (!jwtUtil.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Category category = categoryService.getCategoryById(id).orElse(null);
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
