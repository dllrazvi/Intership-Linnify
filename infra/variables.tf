variable "project_id" {
  description = "Google cloud project id"
}

variable "project_region" {
  type        = string
  description = "Project region"
}

variable "environment" {
  description = "Environment name"
}

variable "web_settings" {
  type = object({
    image           = string,
    min_instances   = string,
    max_instances   = string,
    cpus            = number,
    memory          = string,
    traffic_ingress = string
  })
  description = "WEB cloud run settings"
}