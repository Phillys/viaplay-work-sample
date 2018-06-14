# Viaplay Work Sample Assignment

## How to install & run
There are three ways of running the API. Locally with Node.js, locally with PM2 (for auto clustering) and using a simple Docker container.

### Configuration
Start by copying `example.env` to `.env`.
```
cp example.env .env
```

The `.env` file is used for configuration. Please supply the API key for the Movie DB API. You can also change which port Node.js (Express) is listening on.

### Local with Node.js 10.x
```
npm install
npm start
```

### Local with PM2
```
npm install -g PM2
npm install
pm2 start pm2.config.js
```

### Docker 
```
docker build -t viaplay-work-sample .
docker run -p 8080:8080 -d viaplay-work-sample
```

## Performance


## Scalability
Cache
Threads


## Tests
E2e