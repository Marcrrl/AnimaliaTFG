package com.animalia.spring.seguridad;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.animalia.spring.Excepciones.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

	private final ObjectMapper mapper;

	//Este método es para enviar un mensaje al cliente cuando hay un error en la autenticación básica
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException {
		response.addHeader("WWW-Authenticate", "Basic realm=\"" +getRealmName() + "\"");
		response.setContentType("application/json");
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		
		ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, authException.getMessage());
		// Tranforma la apiError a un String (en formato JSON)
		String strApiError = mapper.writeValueAsString(apiError);
		
		PrintWriter writer = response.getWriter();
		writer.println(strApiError);
	}
	
	@PostConstruct
	public void initRealmName() {
		setRealmName("daw2.net");
	}
}
