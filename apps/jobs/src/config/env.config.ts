export type JobsConfig = {
  gcpProjectId: string | undefined;
};

const env: JobsConfig = {
  gcpProjectId: process.env.GCP_PROJECT
};

export default env;
