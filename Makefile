GCP_PROJECT = _
GCP_REGION = _
GCP_WEB = web

IMAGE_WEB = $(GCP_REGION)-docker.pkg.dev/$(GCP_PROJECT)/cloud-run/$(GCP_WEB)
IMAGE_JOBS =  $(GCP_REGION)-docker.pkg.dev/$(GCP_PROJECT)/cloud-run/$(GCP_JOBS)

docker-build-push-web:
	docker build -t $(IMAGE_WEB):$(TAG) -f ./apps/web/Dockerfile .
	docker push $(IMAGE_WEB):$(TAG)

docker-build-push-jobs:
	docker build -t $(IMAGE_JOBS):$(TAG) -f ./apps/jobs/Dockerfile .
	docker push $(IMAGE_JOBS):$(TAG)

deploy-web:
	gcloud run deploy $(GCP_WEB) --image $(IMAGE_WEB) --project $(GCP_PROJECT) --region $(GCP_REGION)

deploy-jobs:
	gcloud run jobs deploy $(GCP_JOBS) --image $(IMAGE_JOBS) --project $(GCP_PROJECT) --region $(GCP_REGION)
