package gatech.edu.ppmtool.security;

import gatech.edu.ppmtool.payload.JWTTokenResponse;
import gatech.edu.ppmtool.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private final String SCHEMA = "Bearer ";
    @Autowired
    private JWTTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    private String getJWTFromRequest(HttpServletRequest request) {
        String tokenBearer = request.getHeader("Authorization");
        if (StringUtils.hasText(tokenBearer) && tokenBearer.startsWith(SCHEMA)) {
            return tokenBearer.substring(SCHEMA.length());
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getJWTFromRequest(httpServletRequest);
            if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
                Long id = tokenProvider.getUserId(token);
                UserDetails userDetails = userDetailsService.loadUserById(id);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayList<>());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e) {
            logger.error("Fail to set authentication for security context");
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
