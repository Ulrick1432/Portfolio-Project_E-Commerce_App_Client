export const isAuthenticated = async() => {
  try {
    const response = await fetch('http://localhost:4000/checkAuthentication')
    return response.json();
  } catch(err) {
    throw new Error(err);
  }
};