import userRoutes from './users.js';
import dateRoutes from './dates.js';
import commentRoutes from './comments.js';

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/dates', dateRoutes);

  app.use('/comments', commentRoutes);

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;