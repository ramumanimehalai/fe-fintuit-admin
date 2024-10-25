const username = "root";
const password = "root";
const basicAuth = btoa(`${username}:${password}`);


export const environment = {
  BaseUrl: '',
  encriptKey: `Basic ${basicAuth}`,
};
