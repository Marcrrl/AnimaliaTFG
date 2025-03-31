package com.animalia.spring.seguridad.JWT.model;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JwtUserResponse{

	private String token;
	
	@Builder(builderMethodName="jwtUserResponseBuilder")
	public JwtUserResponse(String token) {
		this.token = token;
	}
}
