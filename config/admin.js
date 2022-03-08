module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '57b159f9c1bb8f0aad0975df675f974f'),
  },
});
