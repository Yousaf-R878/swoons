import userRoutes from './users.js';
import dateRoutes from './dates.js';

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/dates', dateRoutes);
  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;