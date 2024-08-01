package dev.crltoz.bookify.card;

import dev.crltoz.bookify.product.Product;
import dev.crltoz.bookify.product.ProductService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class CardController {

    @Autowired
    ProductService productService;

    @GetMapping("/productCard")
    public String getProductCard(@RequestParam String id, Model model) {
        Optional<Product> product = productService.getProductById(new ObjectId(id));
        if (product.isEmpty()) {
            return "redirect:/";
        }

        model.addAttribute("product", product.get());
        return "productCard";
    }
}
