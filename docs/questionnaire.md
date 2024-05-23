# Questionnaire

- How much time did it take you? 
About 3 hours.

- How did you think about testing your code?
I wanted to test my code by first making sure that the two endpoints can be hit and the expected status code was being returned.
After the happy path test cases were met, I wanted to add test cases where it will fail like missing attributes and invalid types. For example, the validating of the Event payload coming into the /events endpoint where you can give the wrong type and it should return the HTTP code 400 for bad request.

- How did you verify your solution meets the requirements?
1. By having unit test cases that reflect the requirements. For Events, if I post event payloads, the events list must go up in size like it is inserting into a "database".
2. For Metrics, I made sure when I added an event record that is older than 24 hours, that it does not add to the count. So that it will satisfy the requirement to show the last 24 hours metric.
3. There were a set of valid eventTypes so I made sure to have validation for the payload. An appropriate HTTP code is returned to the client and will not get queried from the internal system (aka local memory).

- What tradeoffs did you make and why?
Strictness versus Flexible: Using Typescript for this application, I utilised its static typing capabilites rather than dynamic typing. This allows for strictness and the compiler to catch typing errors at compile time which reduces the need for validation. For example, the Event interface I specified certain fields to be required. If the user passes the wrong type (number instead of string), it will throw an error.
Developer Experience versus Performance: Strict typing makes it easier for devs to understand what the data should be. Though it adds extra code when TS is compiled to JS, but I would rather go with clarity and maintainability for the next dev (or future me). This also improves developer experience since there is a structure on expected data through type declarations in interfaces and functions.

- Shortcuts are encouraged to keep time investment of the assignment minimal. What shortcuts did you take? Anything you specifically want to mention that you wouldn’t normally do?
I made quite a few assumptions such as:
1. Not using a database so I did not consider having a primary key for the Event records.
2. Certain classes the the Validator could have been abstracted, but I did not have enough time. It would be useful if there is another validation needed and the new validation can inherit from the same abstract validation class.
3. I decided to not "prime" my "database" with data when the server starts. Ideally I would have liked to create a nice bunch of pre-existing data with dummy data.
4. I decided to make all the timestamps coming in ISO UTC format that way I did not have to think of payloads coming from systems in other timezones. It would have been tricky to accept a timestamp with timezone and do the comparison given the time. So assume all timestamps are ISO 8601 UTC format.
5. Since the events list can get large like a database, I did not consider purging any data after a given time. That would require time and business requirements based on how far back the records are to be kept.
6. The events can get very large thus making metrics endpoint return a very large list. This could be improved with pagination and something I would incorporate if I had additional time.

- What was tricky and why?
The given JSON examples were vague so I had to make an assumption that the JSON was only a minimum sample and not a complete one. I assume there are more to the JSON sample like userId and eventType. I thought of it like "event logs" so it should contain these details.

As of now, you can insert as much data into the Events endpoint so that means the list of events grows larger.
This will make a VERY LARGE list returned when the Metrics endpoint is called.


