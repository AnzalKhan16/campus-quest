package com.campusquest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CampusQuestApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusQuestApplication.class, args);
    }

}
