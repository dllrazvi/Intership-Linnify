resource "google_project_service" "default" {
  project = var.project_id
  service = "certificatemanager.googleapis.com"
}

resource "google_certificate_manager_dns_authorization" "default" {
  domain = var.domain
  name   = "dns-authorization"

  depends_on = [
    google_project_service.default
  ]
}

resource "google_certificate_manager_certificate" "default" {
  name = "certificate"
  managed {
    dns_authorizations = [
      google_certificate_manager_dns_authorization.default.id
    ]
    domains = [
      google_certificate_manager_dns_authorization.default.domain,
      "*.${google_certificate_manager_dns_authorization.default.domain}",
    ]
  }

  depends_on = [
    google_project_service.default
  ]
}

resource "google_certificate_manager_certificate_map" "default" {
  name        = "certificate-map"
  description = "Main certificate map"

  depends_on = [
    google_project_service.default
  ]
}

resource "google_certificate_manager_certificate_map_entry" "wildcard" {
  name        = "wildcard-certificate-map-entry"
  description = "Wildcard certificate map entry"
  map = google_certificate_manager_certificate_map.default.name
  hostname = "*.${var.domain}"
  certificates = [
    google_certificate_manager_certificate.default.id
  ]
}

resource "google_certificate_manager_certificate_map_entry" "web" {
  name        = "web-certificate-map-entry"
  description = "Web certificate map entry"
  map = google_certificate_manager_certificate_map.default.name
  hostname = var.domain
  certificates = [
    google_certificate_manager_certificate.default.id
  ]
}

resource "google_certificate_manager_certificate_map_entry" "assets" {
  name        = "assets-certificate-map-entry"
  description = "Assets certificate map entry"
  map = google_certificate_manager_certificate_map.default.name
  hostname = "assets.${var.domain}"
  certificates = [
    google_certificate_manager_certificate.default.id
  ]
}
