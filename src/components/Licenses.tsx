import { useState } from "react";
import "./styles/Licenses.css";

type LicenseItem = {
  title: string;
  date: string;
  url?: string;
};

type CompanyLicenses = {
  company: string;
  items: LicenseItem[];
};

const companies: CompanyLicenses[] = [
  {
    company: "Deloitte",
    items: [
      {
        title: "Data Analytics Job Simulation",
        date: "January 2026",
        url: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_FkbsdADXz8YZJf5Rb_1767940132623_completion_certificate.pdf",
      },
      {
        title: "Technology Job Simulation",
        date: "June 2025",
        url: "https://www.linkedin.com/posts/john-praneeth_excited-to-complete-the-deloitte-australia-activity-7343231399950209024-Dvyd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD8tPc0BpU0ZbiLyPcFXRwpGseFCiyHzfaQ",
      },
    ],
  },
  {
    company: "Google",
    items: [
      {
        title: "Introduction to Generative AI",
        date: "September 2023",
        url: "https://www.skills.google/public_profiles/6ad073c8-e45c-4938-a5f5-942f279e9528/badges/5373892?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      },
      {
        title: "Introduction to Large Language Models",
        date: "September 2023",
        url: "https://www.skills.google/public_profiles/6ad073c8-e45c-4938-a5f5-942f279e9528/badges/5379777?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      },
      {
        title: "Responsible AI: Applying AI Principles with Google Cloud",
        date: "September 2023",
        url: "https://www.skills.google/public_profiles/6ad073c8-e45c-4938-a5f5-942f279e9528/badges/5402634?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      },
    ],
  },
  {
    company: "Meta",
    items: [
      {
        title: "Front-End Development Certificate",
        date: "October 2023",
        url: "https://www.linkedin.com/posts/john-praneeth_frontenddevelopment-meta-coursera-activity-7123557721286594560-crW2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD8tPc0BpU0ZbiLyPcFXRwpGseFCiyHzfaQ",
      },
    ],
  },
];

const Licenses = () => {
  const [openCompanies, setOpenCompanies] = useState<Record<string, boolean>>({
    Deloitte: true,
    Google: true,
    Meta: true,
  });

  const toggleCompany = (name: string) => {
    setOpenCompanies((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="licenses-section">
      <div className="licenses-container">
        <h2>
          Licenses <span>&amp;</span>
          <br /> certifications
        </h2>
        <ul className="licenses-list">
          {companies.map(({ company, items }) => {
            const isOpen = openCompanies[company];
            return (
              <li key={company} className="licenses-row">
                <button
                  type="button"
                  className="license-company-toggle"
                  onClick={() => toggleCompany(company)}
                >
                  <span className="license-company">{company}</span>
                  <span
                    className={`license-caret${isOpen ? " license-caret-open" : ""}`}
                  >
                    ▾
                  </span>
                </button>
                <ul
                  className={`license-sublist${
                    !isOpen ? " license-sublist-collapsed" : ""
                  }`}
                >
                  {items.map((item) => (
                    <li key={item.title}>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="license-title license-link"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <span className="license-title">{item.title}</span>
                      )}
                      <span className="license-date">{item.date}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Licenses;
