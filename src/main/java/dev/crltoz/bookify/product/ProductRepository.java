package dev.crltoz.bookify.product;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    List<Product> findByAddress_CountryAndAddress_City(String country, String city);

    @Query(value = "{}", fields = "{ 'address.country': 1, 'address.city': 1 }")
    Collection<ProductSummary> findAllAddresses();
}
