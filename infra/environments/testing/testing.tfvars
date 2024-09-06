project_id     = "linny-development"
environment    = "testing"
project_region = "europe-west3"

web_settings = {
  image           = "web",
  min_instances   = 0,
  max_instances   = 15,
  cpus            = 1,
  memory          = "512Mi",
  traffic_ingress = "all"
}

