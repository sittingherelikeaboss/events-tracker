# Setup Instructions

Hi! Follow steps below to setup and run this application in your local.

1. Run `npm install` to install dependencies.
2. Run `npm run build` to build the Typescript application. It will generate a `/build` folder with compiled TS code into JS.
3. Run `npm run dev` to run the local server.
4. Port 5000 will be the port to listen to. If you are using a Mac, AirPlay is using this port so you may need to turn off AirPlay temporarily (System Settings > Search for "AirPlay Receiver" > toggle "AirPlay Receiver" off).

# Unit Testing

1. Run `npm run test` to run the test suites.

# Postman Collection

The Postman collection can be found [here](events.postman_collection.json).

If you do not have Postman, that's ok. You can use the cURL commands provided.

# Events API

## 1. Create Event

Endpoint: **POST** `http://localhost:5000/events`

### Assumptions

1. When you start the application, the local memory does not have any events initially. So any events from before are wiped out. Anything you POST to it will be the start of the events memory.
2. Assume there is no database and events are stored in local memory.
3. `timestamp` in the payload is correct and is valid.
4. `userId` is a unique uuid.
5. `accountId` is a unique uuid.

### 200 OK

### curl

```
curl --location 'http://localhost:5000/events' \
--header 'Content-Type: application/json' \
--data '{
    "timestamp": "2024-05-04T05:57:46Z",
    "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
    "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
    "eventType": "SignIn"
}'
```

#### Request Body

```json
{
    "timestamp": "2024-05-04T02:15:46Z",
    "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
    "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
    "eventType": "SignIn"
}
```

#### Response


```json
{
    "timestamp": "2024-05-04T05:57:46Z",
    "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
    "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
    "eventType": "SignIn"
}
```

### 400 Bad Request - Invalid eventType

#### Response

```json
Incorrect eventType
```

## 2. Retrieve Metrics

Description: Retrieves events in the last 24 hours.

Endpoint: **GET** `http://localhost:5000/metrics`

### Assumptions Made

1. Timestamps are in UTC. All request are done from the same timezone, do not consider other timezones.
2. The list of events in "database" has good data and is valid. Does not need validation. 

### 200 OK

#### curl

```
curl --location 'http://localhost:5000/metrics'
```

#### Request Body

None

#### Response

```json
{
    "counts": {
        "NewDevice": 0,
        "SignIn": 1,
        "CreateItem": 0,
        "DeleteItem": 0,
        "ViewItem": 0
    }
}
```