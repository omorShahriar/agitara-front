export const jobReducer = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.attributes };
  job.id = rawJob.id;

  job.datePosted = dateReducer(job.datePosted);
  job.company = companyReducer(job.company.data);
  job.skills = skillsReducer(job.skillsTags);
  job.aboutYou = richTextReducer(job.aboutYou);
  job.remunerationPackage = richTextReducer(job.remunerationPackage);
  job.jobResponsibilities = richTextReducer(job.jobResponsibilities);
  job.jobDescription = richTextReducer(job.jobDescription);

  const relatedJobs = job.relatedJobs || [];

  if (!parseRelatedJobs) {
    job.relatedJobs = [];
  } else {
    job.relatedJobs = relatedJobs.data.map((relatedJob) => {
      return jobReducer(relatedJob, false);
    });
  }

  return job;
};
