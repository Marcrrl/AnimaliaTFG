package com.animalia.spring;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.animalia.spring.entidades.Animales;
import com.animalia.spring.entidades.Empresas;
import com.animalia.spring.entidades.Fotos;
import com.animalia.spring.entidades.Rescates;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.Animales.EstadoConservacion;
import com.animalia.spring.entidades.Animales.Familia;
import com.animalia.spring.entidades.Empresas.TipoEmpresa;
import com.animalia.spring.repositorio.AnimalesRepositorio;
import com.animalia.spring.repositorio.EmpresasRepositorio;
import com.animalia.spring.repositorio.UsuarioRepositorio;
import com.animalia.spring.repositorio.RescatesRepositorio;
import com.animalia.spring.repositorio.FotosRepositorio;

@SpringBootApplication
public class AnimaliaApplication {

        public static void main(String[] args) {
                SpringApplication.run(AnimaliaApplication.class, args);
        }

        @Bean
        CommandLineRunner initData(AnimalesRepositorio animalesRepositorio, UsuarioRepositorio usuariosRepositorio,
                        EmpresasRepositorio empresasRepositorio, RescatesRepositorio rescatesRepositorio,
                        FotosRepositorio fotosRepositorio, PasswordEncoder passwordEncoder) {
                return (args) -> {
                        if (animalesRepositorio.count() == 0 && usuariosRepositorio.count() == 0
                                        && empresasRepositorio.count() == 0 && rescatesRepositorio.count() == 0
                                        && fotosRepositorio.count() == 0) {
                                Animales a1 = new Animales(null, "Canis lupus familiaris", "Perro",
                                                "Animal domesticado y compañero del ser humano",
                                                "perro.jpg",
                                                EstadoConservacion.SIN_RIESGO, Familia.MAMIFERO, false);
                                Animales a2 = new Animales(null, "Felis catus", "Gato",
                                                "Animal doméstico, conocido por su agilidad",
                                                "gato.jpg",
                                                EstadoConservacion.SIN_RIESGO,
                                                Animales.Familia.MAMIFERO, false);
                                Animales a3 = new Animales(null, "Equus ferus caballus", "Caballo",
                                                "Animal de granja atrapado en una terraza",
                                                "caballo.jpg", EstadoConservacion.EXTINTO,
                                                Familia.MAMIFERO, false);
                                Animales a4 = new Animales(null, "Panthera leo", "León",
                                                "Gran felino conocido como el rey de la selva",
                                                "leon.jpg",
                                                EstadoConservacion.EXTINTO, Animales.Familia.MAMIFERO, false);
                                Animales a5 = new Animales(null, "Ailuropoda melanoleuca", "Panda",
                                                "Oso de China, famoso por su color blanco y negro",
                                                "panda.jpg", EstadoConservacion.PELIGRO_EXTINCION,
                                                Familia.MAMIFERO, false);
                                Animales a6 = new Animales(null, "Aquila adalberti", "Águila Imperial Ibérica",
                                                "Es una de las aves endémicas de la península ibérica.", "aguila.jpg", EstadoConservacion.BAJO_RIESGO, Familia.AVES, false);
                                Animales a7 = new Animales(null, "Ambystoma mexicanum", "Ajolote",
                                                "El ajolote​ es una especie de anfibio relacionado con la salamandra tigre.​​",
                                                "ajolote.jpg", EstadoConservacion.PELIGRO_EXTINCION,
                                                Familia.ANFIBIO, false);
                                Animales a8 = new Animales(null, "Capra aegagrus hircus", "Cabra",
                                                "La cabra es un mamífero que fue domesticado alrededor del octavo milenio a.C..​​",
                                                "cabra.jpg", EstadoConservacion.SIN_RIESGO,
                                                Familia.MAMIFERO, false);
                                Animales a9 = new Animales(null, "Sus scrofa domesticus", "Cerdo",
                                                "Es un animal doméstico usado en la alimentación humana por muchos pueblos.​​",
                                                "cerdo.jpg", EstadoConservacion.SIN_RIESGO,
                                                Familia.MAMIFERO, false);
                                Animales a10 = new Animales(null, "Acipenser sturio", "Esturión Europeo",
                                                "Presenta cuatro barbillas y un hocico muy prominente. El dorso es marrón o gris oscuro más pálido sobre los costados y el vientre blanco.​",
                                                "esturion_europeo.jpg", EstadoConservacion.PELIGRO_EXTINCION,
                                                Familia.PECES, false);
                                Animales a11 = new Animales(null, "Lynx pardinus", "Lince Ibérico",
                                                "El lince ibérico es una especie de mamífero endémico de la península ibérica.​",
                                                "lince_iberico.jpg", EstadoConservacion.PELIGRO_EXTINCION,
                                                Familia.MAMIFERO, false);
                                Animales a12 = new Animales(null, "Gallotia simonyi", "Lagarto Gigante de El Hierro",
                                                "El lagarto gigante se considera, según una ley del Gobierno de Canarias, el símbolo natural de la isla de El Hierro​.",
                                                "lagarto_gigante_de_el_hierro.jpg", EstadoConservacion.PELIGRO_EXTINCION,
                                                Familia.REPTIL, false);
                                Animales a13 = new Animales(null, "Ovis orientalis", "Oveja",
                                                "La oveja ​ es un mamífero cuadrúpedo ungulado doméstico, utilizado como ganado​.",
                                                "oveja.jpg", EstadoConservacion.SIN_RIESGO,
                                                Familia.MAMIFERO, false);
                                Animales a14 = new Animales(null, "Balaeniceps rex", "Picozapato",
                                                "El picozapato​ es una especie de ave el cual su nombre común alude a la forma de su enorme pico.",
                                                "picozapato.jpg",EstadoConservacion.BAJO_RIESGO,
                                                Familia.AVES, false);
                                Animales a15 = new Animales(null, "Bos taurus", "Toro",
                                                "Se caracteriza por su cuerpo robusto, cubierto de pelo corto, y por sus cuernos.",
                                                "toro.jpg",EstadoConservacion.SIN_RIESGO,
                                                Familia.MAMIFERO, false);
                                Animales a16 = new Animales(null, "Gypaetus barbatus", "Quebrantahuesos",
                                                "Es un buitre notablemente distinto de otras aves de presa parecidas.",
                                                "quebrantahuesos.jpg",EstadoConservacion.BAJO_RIESGO,
                                                Familia.AVES, false);
                                Animales a17 = new Animales(null, "Bos taurus", "Vaca",
                                                "Tiene el cuerpo cubierto de pelo, tiene cuatro patas y rabo.",
                                                "vaca.jpg",EstadoConservacion.BAJO_RIESGO,
                                                Familia.MAMIFERO, false);
                                List<Animales> animales = Arrays.asList(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
                                animales.forEach(animal -> {
                                        animalesRepositorio.save(animal);
                                });
                                Empresas e1 = new Empresas(null, "Clínica veterinaria",
                                                "C. Venezuela, 12, 03010 Alicante (Alacant), Alicante",
                                                "12345678",
                                                "clinica@example.com", TipoEmpresa.CLINICA, "url_empresa_1.es",
                                                LocalDate.of(1999, 12, 6), false, new HashSet<>());
                                Empresas e2 = new Empresas(null, "Acuario",
                                                "Gran Vía, 1, 03010 Alicante (Alacant), Alicante", "87654321",
                                                "acuario@example.com", TipoEmpresa.ACUARIO, "url_empresa_2.es",
                                                LocalDate.of(1999, 12, 6), false, new HashSet<>());

                                Empresas e3 = new Empresas(null, "Hospital veterinario",
                                                "Av. Pintor Baeza, 12, 03010 Alicante (Alacant), Alicante", "23456789",
                                                "hospital@example.com", TipoEmpresa.HOSPITAL, "url_empresa_3.es",
                                                LocalDate.of(1999, 12, 6), false, new HashSet<>());

                                Empresas e4 = new Empresas(null, "Protectora Animales",
                                                "C. Pablo Neruda, 03011 Alicante (Alacant), Alicante",
                                                "34567890",
                                                "protectora@example.com", TipoEmpresa.PROTECTORA, "url_empresa_4.es",
                                                LocalDate.of(1999, 12, 6), false, new HashSet<>());

                                Empresas e5 = new Empresas(null, "Refugio Don Fabro",
                                                "C. Maravilla Damasco Fierro, 03011 Alicante (Alacant), Alicante",
                                                "45678901",
                                                "fabro234@example.com", TipoEmpresa.REFUGIO,
                                                "https://www.youtube.com/channel/UCe_vi8ZY603vDSYEVMayV0A",
                                                LocalDate.of(1999, 12, 6), false, new HashSet<>());

                                Empresas e6 = new Empresas(null, "Reserva de Animales", "C. Vicente Alexandre",
                                                "56789012",
                                                "reserva@example.com", TipoEmpresa.RESERVA, "url_empresa_6.es",
                                                LocalDate.of(1999, 12, 6), false, new HashSet<>());

                                // Lista de empresas
                                List<Empresas> empresas = Arrays.asList(e1, e2, e3, e4, e5, e6);

                                // Creación de usuarios
                                Usuarios u1 = new Usuarios(null,
                                                "Ruven",
                                                "Rrata",
                                                "usuario@animalia.com",
                                                passwordEncoder.encode("123"),
                                                "123456789",
                                                "Calle Pageable 123",
                                                "bardockNegro+.jpg",
                                                Usuarios.TipoUsuario.USER,
                                                LocalDate.now(),
                                                0,
                                                null,
                                                false);

                                Usuarios u2 = new Usuarios(null,
                                                "Marc",
                                                "Ramón",
                                                "admin@animalia.com",
                                                passwordEncoder.encode("123"),
                                                "987654321",
                                                "Avenida Siempre Viva 456",
                                                "iconoBase.png",
                                                Usuarios.TipoUsuario.ADMIN,
                                                LocalDate.now(),
                                                10,
                                                null,
                                                false);

                                Usuarios u3 = new Usuarios(null,
                                                "Jorge",
                                                "Fabro",
                                                "empresa@animalia.com",
                                                passwordEncoder.encode("123"),
                                                "123450324",
                                                "Calle de la Moneda 324",
                                                "iconoBase.png",
                                                Usuarios.TipoUsuario.EMPRESA,
                                                LocalDate.now(),
                                                5, e5,
                                                false);
                                
                                Usuarios u4 = new Usuarios(null,
                                                "David",
                                                "Cascala",
                                                "usuario2@animalia.com",
                                                passwordEncoder.encode("123"),
                                                "123456788",
                                                "Calle Peichbol 404",
                                                "bardockNegro+.jpg",
                                                Usuarios.TipoUsuario.USER,
                                                LocalDate.now(),
                                                0,
                                                null,
                                                false);
                                // Lista de usuarios
                                List<Usuarios> usuarios = Arrays.asList(u1, u2, u3, u4);

                                e5.getUsuarios().add(u3);

                                // Guardar empresas y usuarios
                                empresasRepositorio.saveAll(empresas);
                                usuariosRepositorio.saveAll(usuarios);
                                Rescates r1 = new Rescates(null, e5, u3, a1, "Calle Falsa 123",
                                                Rescates.Estado.ASIGNADO, Rescates.EstadoAnimal.DESCONOCIDO,
                                                LocalDate.now(), null);
                                Rescates r2 = new Rescates(null, e1, u1, a2, "Calle Verdadera 456",
                                                Rescates.Estado.NO_ASIGNADO, Rescates.EstadoAnimal.LEVE,
                                                LocalDate.now(), null);
                                Rescates r3 = new Rescates(null, e2, u1, a3, "Calle Falsa 123",
                                                Rescates.Estado.FINALIZADO, Rescates.EstadoAnimal.SANO,
                                                LocalDate.now(), null);
                                Rescates r4 = new Rescates(null, e3, u4, a4, "Calle Falsa 123",
                                                Rescates.Estado.FINALIZADO, Rescates.EstadoAnimal.GRAVE,
                                                LocalDate.now(), null);
                                Rescates r5 = new Rescates(null, e4, u4, a5, "Avenida Sol 654",
                                                Rescates.Estado.DESCONOCIDO, Rescates.EstadoAnimal.SANO,
                                                LocalDate.now(), null);
                                Rescates r6 = new Rescates(null, e6, u3, a6, "Calle Falsa 123",
                                                Rescates.Estado.NO_ASIGNADO, Rescates.EstadoAnimal.DESCONOCIDO,
                                                LocalDate.now(), null);
                                // Guardar rescates
                                List<Rescates> rescates = Arrays.asList(r1, r2, r3, r4, r5, r6);
                                rescatesRepositorio.saveAll(rescates);

                                Fotos f1 = new Fotos(null, "perro.jpg", r1, u3, "38.361561|-0.491348",
                                                "Perro en la calle", LocalDate.now());
                                Fotos f2 = new Fotos(null, "gato.jpg", r2, u2, "38.362822|-0.491400",
                                                "Gato en la calle", LocalDate.now());
                                Fotos f3 = new Fotos(null, "caballo.jpg", r3, u2, "38.361081|-0.495176",
                                                "Caballo en la calle", LocalDate.now());
                                Fotos f4 = new Fotos(null, "leon.jpg", r4, u2, "38.357874|-0.492279",
                                                "León en la calle", LocalDate.now());
                                Fotos f5 = new Fotos(null, "panda.jpg", r5, u2, "38.361850|-0.488598",
                                                "Panda en la calle", LocalDate.now());
                                Fotos f6 = new Fotos(null, "aguila.jpg", r6, u2, "38.360345|-0.490459",
                                                "Águila volando", LocalDate.now());

                                // Guardar fotos
                                List<Fotos> fotos = Arrays.asList(f1, f2, f3, f4, f5, f6);
                                fotosRepositorio.saveAll(fotos);

                                // Enlazar fotos con rescates
                                r1.setFotos(Arrays.asList(f1));
                                r2.setFotos(Arrays.asList(f2));
                                r3.setFotos(Arrays.asList(f3));
                                r4.setFotos(Arrays.asList(f4));
                                r5.setFotos(Arrays.asList(f5));
                                r6.setFotos(Arrays.asList(f6));

                                // Guardar rescates con fotos
                                rescatesRepositorio.saveAll(Arrays.asList(r1, r2, r3, r4, r5, r6));
                        }
                };
        }
}
