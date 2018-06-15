# Viaplay Work Sample Assignment

## How to install & run
I recommend running the API server in one of the following ways; locally with Node.js, locally with PM2 (for auto clustering) or using Docker.

### Configuration
The `.env` file is used for configuration. Start by copying `example.env` to `.env`.
```
cp example.env .env
```
Please enter the API key for the Movie DB API. You can also change which port Node.js (Express) is listening on.

### Node.js 10.x
```
npm install
npm start
```

### PM2
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

## Food for thought
This is not by any means a production ready implementation. First of all I would never consider to run the application by itself without any reverse proxy/web server/load balancer (Nginx/HAProxy/AWS API Gateway) in front of it. Rate limiting and authentication would improve security and reliability. The tests should be extended with end-to-end (e2e) tests to verify the application flow. I would also evaluate if all external code dependencies really are necessary since they could pose security risks (not now, but maybe in future versions).

To successfully perform under high load (req/sec) in this assignment, I consider the understanding of concurrency, parallelism and caching to be paramount. One reason to use caching is because the application is I/O bound as we have to do three subsequent requests to get one movie trailer. In my implementation I use a plugin together with the HTTP client (Axios) to cache all API requests (we only have to do each request once). The caching plugin uses Node's process memory which may not be ideal for production. In production we would be better of using Redis or some other fast in-memory datastore. I/O heavy tasks can often be facilitated by concurrency (asynchronous) but since all the requests depend on the data from each other we must dispatch them sequentially (synchronous). One thing we can do to improve the performance of the API is to leverage the Node cluster module (parallelism), either by using a process manager (in e.g. PM2) or implement it in the application itself. Another approach could be to run multiple instances/containers (maybe orchestrated using Kubernetes) of the API application.
