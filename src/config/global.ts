// export const API_BASE_URL = "http://127.0.0.1:8000/api/";
export const API_BASE_URL = "http://194.164.77.56/aurlus/api/";
export const TOKEN_STORAGE_KEY = "adminToken";
export const API_ENDPOINT = {
    login : "auth/login",
    logout: "auth/logout",

    //experiences routes
    experiences: "admin/experiences",
    //toogle status
    toggleStatus: "toggle-status",
    //educations routes
    educations: "admin/educations",
    //certifications routes
    certifications: "admin/certifications",
    //languages routes
    languages: "admin/languages",
    //skills routes
    skills: "admin/skills",
    //projects route
    projects: "admin/projects",
    //about routes
    about: "admin/about",

    //portfolio experiences routes
    portfolioExperiences: "portfolio/experiences",
    //portfolio educations routes
    portfolioEducations: "portfolio/educations",
    //portfolio certifications routes
    portfolioCertifications: "portfolio/certifications",
    //portfolio languages routes
    portfolioLanguages: "portfolio/languages",
    //portfolio skills routes
    portfolioSkills: "portfolio/skills",
    //portfolio projects routes
    portfolioProjects: "portfolio/projects",
    //portfolio about routes
    portfolioAbout: "portfolio/about",
    // Contact routes
    contactSend: "portfolio/contact/send",

    // Admin contact routes
    adminContacts: "admin/contacts",
    adminContactMarkRead: "admin/contacts/{id}/mark-read"
}