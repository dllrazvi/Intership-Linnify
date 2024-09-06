module "web-linny-skills" {
  source              = "git@bitbucket.org:linnify/terraform-cloud-run.git?ref=v1.1.1"
  name                = "linny-skills"
  project_region      = var.project_region
  project_id          = var.project_id
  image               = "${module.artifact-registry-linny-skills.repository_address}/${var.web_settings.image}"
  port                = 3000
  environment         = var.environment
  cloudsql_instances  = ["${var.project_id}:${var.project_region}:fullstack-course-db"]
  min_instances       = var.web_settings.min_instances
  max_instances       = var.web_settings.max_instances
  cpus                = var.web_settings.cpus
  memory              = var.web_settings.memory
  env                 = jsondecode(templatefile("environments/${var.environment}/api.environment.tpl", {
    project_id = var.project_id,
    project_region = var.project_region,
  }))
  allow_public_access = true
  traffic_ingress     = var.web_settings.traffic_ingress
  vpc_connector       = null
  service_account     = module.application-linny-skills.service_account

  depends_on = [
    module.application-linny-skills.service_account,
    module.artifact-registry-linny-skills
  ]
}