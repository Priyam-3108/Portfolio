/**
 * CONFIGURATION
 * This file contains environment-specific variables.
 * In a production environment, these could be injected during build time.
 */

const CONFIG = {
    EMAILJS: {
        PUBLIC_KEY: 'wYtjS4tW7DE0Qo6IN',
        SERVICE_ID: 'default_service',
        TEMPLATE_ID: 'template_orawalx'
    },
    CONTACT: {
        EMAIL: 'example@gmail.com',
        PHONE: '+91 0123456789',
        LOCATION: 'Bhavnagar, Gujarat'
    },
    SOCIAL: {
        LINKEDIN: 'https://www.linkedin.com/in/dhaval-asodariya-b6a514232',
        GITHUB: 'https://github.com/',
        TWITTER: 'https://twitter.com',
        INSTAGRAM: 'https://instagram.com'
    }
};

// Freeze the config to prevent modifications
Object.freeze(CONFIG);
