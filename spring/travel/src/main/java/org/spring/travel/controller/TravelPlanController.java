package org.spring.travel.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
@RequiredArgsConstructor
public class TravelPlanController {

    @GetMapping("api/plan")
    public String test(){
        return "asdf";
    }
    @PostMapping("api/plan")
    public String savePlan(){
        return "saved";
    }

}
