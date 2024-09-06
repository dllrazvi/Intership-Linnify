module "artifact-registry-linny-skills" {
  source                 = "git@bitbucket.org:linnify/terraform-artifact-registry.git?ref=v1.0.0"
  project_id             = var.project_id
  repository_description = "Repository for holding Cloud Run Images"
  repository             = "linny-skills"
  repository_location    = var.project_region
  repository_format      = "DOCKER"
}
