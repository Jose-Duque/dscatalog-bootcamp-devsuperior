package com.devsuperior.dscatalog.services.exceptions;

public class EntityNotFoundExeption extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public EntityNotFoundExeption(String msg) {
		super(msg);
	}
}
