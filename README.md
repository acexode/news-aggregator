# News Aggregator

A modern news aggregation platform built with React, TypeScript, and TailwindCSS that pulls articles from various sources including NewsAPI, The Guardian, and The New York Times.

## Features

- Search articles by keyword
- Filter by news source
- Filter by category and date
- Responsive design
- Real-time updates using React Query

## Technologies Used

- React
- TypeScript
- TailwindCSS
- React Query
- Docker

## Running with Docker

### Prerequisites

- Docker installed on your machine
- Docker Compose (usually comes with Docker Desktop)

### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd news-aggregator
   ```

2. Create a `.env` file in the root directory with your API keys:
   ```env
   VITE_NEWS_API_KEY=your_news_api_key
   VITE_GUARDIAN_API_KEY=your_guardian_api_key
   VITE_NYT_API_KEY=your_nyt_api_key
   ```

3. Build and run the container:
   ```bash
   docker-compose up -d
   ```

4. Access the application at `http://localhost:3000`

### Option 2: Using Docker Directly

1. Build the Docker image:
   ```bash
   docker build -t news-aggregator .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:80 --name news-aggregator news-aggregator
   ```

3. Access the application at `http://localhost:3000`

### Stopping the Container

Using Docker Compose:
```bash
docker-compose down
```

Using Docker Directly:
```bash
docker stop news-aggregator
docker rm news-aggregator
```

## Accessing the Application

Open your browser and navigate to `http://localhost:3000` to view the application.

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
