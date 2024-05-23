import app from './routes/app';

const PORT: Number = 5000;

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));