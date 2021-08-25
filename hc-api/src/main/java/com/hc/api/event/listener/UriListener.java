package com.hc.api.event.listener;
import java.net.URI;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.hc.api.event.UriEvent;

@Component
public class UriListener implements ApplicationListener<UriEvent>  {


	@Override
	public void onApplicationEvent(UriEvent uriEvent) {
		HttpServletResponse response = uriEvent.getResponse();
		Long id = uriEvent.getId();
		
		adicionarHeaderLocation(response, id);
	}

	private void adicionarHeaderLocation(HttpServletResponse response, Long id) {
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(id).toUri();
		response.setHeader("Location", uri.toASCIIString());
	}

}