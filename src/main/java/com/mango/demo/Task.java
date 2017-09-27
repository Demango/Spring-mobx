package com.mango.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Task {

	private @Id @GeneratedValue Long id;
	private String title;
	private String description;
	private Boolean checked;

	private Task() {}

	public Task(String title, String description, Boolean checked) {
		this.title = title;
		this.description = description;
		this.checked = checked;
	}
}
