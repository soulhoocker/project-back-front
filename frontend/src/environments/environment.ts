import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false, // Pour dev, mettre à false
  apiUrl: 'http://localhost:8089/transporter', // URL de ton backend Spring Boot
};
