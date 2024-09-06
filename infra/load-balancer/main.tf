resource "google_project_service" "compute_service" {
  project = var.project_id
  service = "compute.googleapis.com"
}

resource "google_compute_global_address" "default" {
  name        = "app-lb-ip"
  description = "Global IP Address used in Load Balancer"
  depends_on = [
    google_project_service.compute_service
  ]
}

resource "google_compute_region_network_endpoint_group" "web" {
  name                  = "web"
  network_endpoint_type = "SERVERLESS"
  region                = var.project_region
  cloud_run {
    service = var.web_service_name
  }
  depends_on = [
    google_project_service.compute_service
  ]
}

resource "google_compute_backend_service" "web" {
  name                    = "web-backend"
  description             = "Web Backend service"
  custom_response_headers = ["X-Cache-Hit: {cdn_cache_status}"]
  enable_cdn              = true
  load_balancing_scheme   = "EXTERNAL_MANAGED"
  locality_lb_policy      = "ROUND_ROBIN"
  backend {
    group = google_compute_region_network_endpoint_group.web.id
  }
  cdn_policy {
    cache_mode        = "USE_ORIGIN_HEADERS"
    serve_while_stale = 86400
    signed_url_cache_max_age_sec = 0
    cache_key_policy {
      include_host = false
      include_protocol = false
      include_query_string = true
      query_string_blacklist = []
    }
  }
}

resource "google_compute_backend_bucket" "assets" {
  name        = "assets-backend"
  description = "Assets Backend bucket"
  bucket_name = var.assets_bucket_name
  enable_cdn  = true
  depends_on = [
    google_project_service.compute_service
  ]
  custom_response_headers = ["X-Cache-Hit: {cdn_cache_status}"]

  cdn_policy {
    cache_mode                    = "USE_ORIGIN_HEADERS"
    serve_while_stale             = 86400
    signed_url_cache_max_age_sec  = 0
    default_ttl                   = null
  }
}

resource "google_compute_url_map" "lb-urlmap" {
  name        = "app-lb"
  description = "App Load Balancer"

  default_url_redirect {
    host_redirect           = "www.${var.domain}"
    strip_query             = false
    https_redirect          = true
    redirect_response_code  = "MOVED_PERMANENTLY_DEFAULT"
  }

  host_rule {
    hosts        = ["www.${var.domain}"]
    path_matcher = "web"
  }

  host_rule {
    hosts        = ["assets.${var.domain}"]
    path_matcher = "assets"
  }

  path_matcher {
    name            = "assets"
    default_service = google_compute_backend_bucket.assets.id
  }

  path_matcher {
    name            = "web"
    default_service = google_compute_backend_service.web.id
  }

  test {
    service = google_compute_backend_service.web.id
    host    = "www.${var.domain}"
    path    = "/auth"
  }

  test {
    service = google_compute_backend_bucket.assets.id
    host    = "assets.${var.domain}"
    path    = "/"
  }
}

resource "google_compute_target_https_proxy" "default" {
  name            = "app-lb-target"
  url_map         = google_compute_url_map.lb-urlmap.id
  certificate_map = var.certificate_map
  ssl_policy      = var.ssl_policy != null ? var.ssl_policy : null
}

resource "google_compute_global_forwarding_rule" "frontend-lb" {
  name                  = "lb-frontend"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "443"
  target                = google_compute_target_https_proxy.default.id
  ip_address            = google_compute_global_address.default.address
  provider              = google-beta
}

# Redirect HTTP to HTTPS Load Balancer Configuration
resource "google_compute_url_map" "lb-http-redirect" {
  name        = "app-lb-http-redirect"
  description = "HTTP to HTTPS redirect for the frontend application"

  default_url_redirect {
    strip_query             = false
    https_redirect          = true
    redirect_response_code  = "MOVED_PERMANENTLY_DEFAULT"
  }
  depends_on = [
    google_project_service.compute_service
  ]
}

resource "google_compute_target_http_proxy" "http-redirect" {
  name    = "app-lb-target-http-redirect"
  url_map = google_compute_url_map.lb-http-redirect.id
}

resource "google_compute_global_forwarding_rule" "frontend-http-redirect" {
  name                  = "lb-frontend-http-redirect"
  description           = "Forwarding rule used for HTTP to HTTPS redirect"
  target                = google_compute_target_http_proxy.http-redirect.self_link
  ip_address            = google_compute_global_address.default.address
  port_range            = "80"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  provider              = google-beta
}
