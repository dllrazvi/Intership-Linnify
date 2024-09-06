variable "project_region" {
  type        = string
  description = "Google cloud project region"
}

variable "project_id" {
  type        = string
  description = "Google cloud project id"
}

variable "assets_bucket_name" {
  type        = string
  description = "Assets bucket name"
}

variable "web_service_name" {
  type        = string
  description = "Web service name"
  default     = "web"
}

variable "domain" {
  type        = string
  description = "Domain name"
}

variable "certificate_map" {
  type        = string
  description = "Reference to the CertificateMap resource uri"
}

variable "api_security_policy" {
  type        = string
  description = "Security Policy used on API Backend"
  default     = null
}

variable "ssl_policy" {
  type        = string
  description = "SSL Policy applied to load balancer"
  default     = null
}
