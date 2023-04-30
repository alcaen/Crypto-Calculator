import app from './app';
import { PORT } from './config';

app.listen(PORT, () => {
  // Start rest server on PORT env
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
