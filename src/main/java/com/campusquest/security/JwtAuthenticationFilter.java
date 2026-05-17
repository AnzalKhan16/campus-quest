package com.campusquest.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // IMPORTANT: Handle CORS manually
        response.setHeader("Access-Control-Allow-Origin",
                "https://campus-quest-gold.vercel.app");

        response.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS");

        response.setHeader("Access-Control-Allow-Headers",
                "Authorization, Content-Type");

        response.setHeader("Access-Control-Allow-Credentials", "true");

        // Allow preflight requests immediately
        if (request.getMethod().equals(HttpMethod.OPTIONS.name())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        try {

            String authorizationHeader =
                    request.getHeader(HttpHeaders.AUTHORIZATION);

            if (authorizationHeader != null &&
                    authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);

                if (jwtUtil.validateToken(token)) {

                    String email = jwtUtil.extractEmail(token);

                    if (email != null &&
                            SecurityContextHolder.getContext()
                                    .getAuthentication() == null) {

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        email,
                                        null,
                                        null
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        SecurityContextHolder.getContext()
                                .setAuthentication(authentication);
                    }
                }
            }

        } catch (Exception e) {

            logger.error("JWT Authentication Error: {}", e.getMessage());

        }

        filterChain.doFilter(request, response);
    }
}