module "application-linny-skills" {
  source       = "git@bitbucket.org:linnify/terraform-service-account.git?ref=v1.0.0"
  project_id   = var.project_id
  account_id   = "application-linny-skills"
  display_name = "Application linny-skills"
  roles        = [
    "roles/secretmanager.secretAccessor",
    "roles/iam.serviceAccountTokenCreator",
    "roles/iam.serviceAccountUser",
    "roles/firebase.admin",
    "roles/storage.objectAdmin",
    "roles/artifactregistry.writer",
    "roles/cloudbuild.builds.editor",
    "roles/run.admin",
    "roles/storage.admin",
    "roles/viewer"
 ]
}