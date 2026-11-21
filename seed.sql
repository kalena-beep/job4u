INSERT INTO "Job" (
  "slug",
  "title",
  "company",
  "description",
  "location",
  "employmentType",
  "workMode",
  "salary",
  "featured",
  "updatedAt"
)
VALUES
(
  'marketing-executive-brightpath-media',
  'Marketing Executive',
  'BrightPath Media',
  'We are looking for a Marketing Executive in Singapore to plan campaigns, coordinate with creative teams, and track performance across digital channels.',
  'Raffles Place, Singapore',
  'Full-time',
  'Hybrid',
  'SGD 4,200 - 5,500 / month',
  true,
  NOW()
),
(
  'hr-assistant-harbourline-group',
  'HR Assistant',
  'Harbourline Group',
  'Support recruitment coordination, onboarding documentation, and employee records in our Singapore office.',
  'Jurong East, Singapore',
  'Full-time',
  'On-site',
  'SGD 3,200 - 3,800 / month',
  false,
  NOW()
);