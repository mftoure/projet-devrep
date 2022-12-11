package toure.kevser.quickdoc.controllers;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
@RequestMapping(value = "/api",method = RequestMethod.GET)
public class Home {

    // il faut declarer une reference vers la DAO qui sera géré par injectioin
    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String hello(){return "hello World !";}
   

}
