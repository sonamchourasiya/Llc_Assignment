package com.app.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="users")
public class User {
     @Id
     @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
     
     @Column(nullable=false,unique=true)
     private String username;
     
     @Column(nullable=false,unique=true)
     private String email;
     @Column(nullable=false)
     private String password;
     
	
}
