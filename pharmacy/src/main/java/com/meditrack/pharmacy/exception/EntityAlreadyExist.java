package com.meditrack.pharmacy.exception;

public class EntityAlreadyExist extends RuntimeException{
    public EntityAlreadyExist(String message){
        super(message);
    }
}
