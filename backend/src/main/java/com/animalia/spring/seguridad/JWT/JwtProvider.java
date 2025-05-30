package com.animalia.spring.seguridad.JWT;
import java.util.Date;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.animalia.spring.entidades.Usuarios;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import lombok.extern.java.Log;

@Log
@Component
public class JwtProvider {
	
	public static final String TOKEN_HEADER = "Authorization";
	public static final String TOKEN_PREFIX = "Bearer";
	public static final String TOKEN_TYPE = "JWT ";
	
	// Cuanto más largo mejor, si es alieatorio mejor
	private String jwtSecreto = "IESDoctorBalmis-2DAW-DesarrolloWebEntornoServidor";
	
	private int jwtDurationTokenEnSegundos = 864000;
	
	public String generateToken(Authentication authentication) {
		
		// Al implementar UserDetails en UserEntity lo que se guarda en Authentication es el propio UserEntity
		Usuarios user = (Usuarios) authentication.getPrincipal();
		
		Date tokenExpirationDate = new Date(System.currentTimeMillis() + jwtDurationTokenEnSegundos * 1000);
		
		String token = Jwts.builder()
				.header().add("typ", TOKEN_TYPE).and()
				.subject(Long.toString(user.getId()))
				.issuedAt(new Date())
				.expiration(tokenExpirationDate)			
				// Esto develve los roles en String. Ejemplo [ADMIN, USER] --> "ADMIN, USER"
				.claim("roles", user.getTipoUsuario().name())
				//Crea la clave secreta utilizando el algoritmo HMAC-SHA que se utilizará para firmar el token JWT
				.signWith(Keys.hmacShaKeyFor(jwtSecreto.getBytes())) 
				.compact();
		return token;
	}
	
	public Long getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser()
							.verifyWith(Keys.hmacShaKeyFor(jwtSecreto.getBytes()))	// Se debe verificar la firma del token usando dicho algoritmo y secreto
							.build() // Crea el parseador del JWT
							.parseSignedClaims(token) //el parseador analizar el token pasado por parámetro
							.getPayload(); //Obtiene el payload del JWT
							
		return Long.parseLong(claims.getSubject());							
	}
	
	public boolean validateToken(String authToken) {
		
		try {
			Jwts.parser().verifyWith(Keys.hmacShaKeyFor(jwtSecreto.getBytes()))
					.build().parseSignedClaims(authToken);
			log.info("JWT Token is valid: " + authToken);
			return true;
		} catch (SecurityException ex) {
			log.info("Error en la firma del token JWT: " + ex.getMessage());
		} catch (MalformedJwtException ex) {
			log.info("Token malformado: " + ex.getMessage());
		} catch (ExpiredJwtException ex) {
			log.info("El token ha expirado: " + ex.getMessage());
		} catch (UnsupportedJwtException ex) {
			log.info("Token JWT no soportado: " + ex.getMessage());
		} catch (IllegalArgumentException ex) {
			log.info("JWT claims vacío");
		}
		return false;
	}

}
