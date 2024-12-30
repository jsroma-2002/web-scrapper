import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: process.env.MAX_REQUESTS_PER_MINUTE || 20, // Máximo de llamadas
  message: { error: 'Límite de solicitudes alcanzado. Intenta nuevamente más tarde.' },
});

export default rateLimiter;
