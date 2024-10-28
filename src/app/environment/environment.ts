const username = "root";
const password = "root";
const basicAuth = btoa(`${username}:${password}`);


export const environment = {
  BaseUrl: 'https://services.fintuit.tech',
  encriptKey: `Basic ${basicAuth}`,
};
