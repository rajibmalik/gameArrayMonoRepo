// upon authentication, handles what to process
const handleAuthentication = (identifier, profile, done) => {
  // User information is stored in session data that can later be accessed
  const user = {
    id: profile.id,
    displayName: profile.displayName,
  };

  return done(null, user);
};

module.exports = {
  handleAuthentication,
};
