CREATE TABLE organization(
organization_id SERIAL PRIMARY KEY,
name VARCHAR (150) NOT NULL,
description TEXT NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);

-- organization inserts

INSERT INTO organization(name,description,contact_email,logo_filename)
VALUES
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects',
'info@brightfuturebuilders.org','brightfuture-logo.png'),
(' GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.',
'contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers',' A volunteer coordination group supporting local charities and service initiatives.',
'hello@unityserve.org','unityserve-logo.png')

-- projects inserts

CREATE TABLE projects(
project_id SERIAL PRIMARY KEY,
organization_id INT REFERENCES organization(organization_id),
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
location VARCHAR(255) NOT NULL,
project_date DATE NOT NULL
)

-- 
INSERT INTO projects (organization_id,title,description,location,project_date)
VALUES
   ( 1,'Clean Water Initiative','Installation of boreholes and clean water systems in underserved communities.',
	'Kaduna, Nigeria','2026-10-05'),
	(2, 'Community Health Outreach', 'Free medical screenings, health education, and basic treatment for local residents.', 'Abuja, Nigeria', '2026-10-12'),
	(3, 'Youth Skills Development', 'Training young people in digital skills, entrepreneurship, and vocational trades.', 'Lagos, Nigeria', '2026-10-20'), 
	(1, 'School Renovation Project', 'Renovation of classrooms, installation of desks, and improvement of school facilities.', 'Kano, Nigeria', '2026-11-01'),
	(2, 'Food Distribution Program', 'Distribution of essential food supplies to vulnerable families and communities.', 'Sokoto, Nigeria', '2026-11-08'), 
	(3, 'Women Empowerment Program', 'Providing women with vocational training, business skills, and access to small grants.', 'Ibadan, Nigeria', '2026-11-15'), 
	(1, 'Tree Planting Campaign', 'Planting trees in schools and communities to improve the local environment.', 'Jos, Nigeria', '2026-11-22'),
	(2, 'Rural Education Support', 'Providing learning materials, books, and educational resources to rural schools.', 'Niger State, Nigeria', '2026-12-03'),
	(3, 'Digital Literacy Program', 'Teaching basic computer and internet skills to students and adults.', 'Benin City, Nigeria', '2026-12-10'), 
	(1, 'Community Road Improvement', 'Repairing damaged community roads to improve transportation and accessibility.', 'Minna, Nigeria', '2026-12-18'), 
	(2, 'Maternal Health Project', 'Improving access to maternal health information, prenatal care, and essential supplies.', 'Zaria, Nigeria', '2027-01-10'), 
	(3, 'Small Business Support', 'Supporting local entrepreneurs with business training, mentorship, and resources.', 'Enugu, Nigeria', '2027-01-17'), 
	(1, 'Solar Power Installation', 'Installing solar-powered lighting systems in communities with limited electricity access.', 'Maiduguri, Nigeria', '2027-01-25'), 
	(2, 'Waste Management Campaign', 'Organizing community clean-up activities and promoting responsible waste disposal.', 'Port Harcourt, Nigeria', '2027-02-02'), 
	(3, 'Orphanage Support Project', 'Providing educational materials, food, clothing, and essential supplies to children in care.', 'Ilorin, Nigeria', '2027-02-14');
