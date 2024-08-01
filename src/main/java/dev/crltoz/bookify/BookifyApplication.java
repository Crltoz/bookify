package dev.crltoz.bookify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BookifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookifyApplication.class, args);
	}
}
