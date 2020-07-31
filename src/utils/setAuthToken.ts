const setAuthToken = (token: string) => {
  if (token) {
    // Apply authorization token to every request if logged in
  } else {
    // Delete auth header
  }
};
export default setAuthToken;