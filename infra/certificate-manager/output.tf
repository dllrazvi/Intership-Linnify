output "certificate_map" {
  value       = google_certificate_manager_certificate_map.default.id
  description = "Certificate Manager Map used in Load Balancer Target Proxy"
}
