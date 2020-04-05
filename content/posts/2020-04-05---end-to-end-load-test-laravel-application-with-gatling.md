---
title: End-to-end Load Test Laravel Application With Gatling
date: "2020-04-05T11:20:37.121Z"
template: "post"
draft: false
slug: "end-to-end-load-test-laravel-application-with-gatling"
category: "MySql"
tags:
  - "Laravel"
  - "Testing"
  - "Gatling"
description: "End-to-end Load Test Laravel Application With Gatling"
---

In this article, I will try to show you that how we can load test a web application (probably written in [Laravel](https://laravel.com)) using [Gatling](https://gatling.io/).

[Gatling](https://gatling.io/) is a tool used for simulating high traffic on your web application and get a nice report with all the necessary metrics.

Let’s say we have a hotel booking web application and the following endpoint returns rooms info in a specific hotel.
```json
/api/{hotel-slug-identifier}/rooms
```

```json
[
    {
        “type”: “single”,
        “beds”: 1,
        “floor”: 1,
        “intercom”: true
    },
    {
        “type”: “single”,
        “beds”: 2,
        “floor”: 2,
        “intercom”: true
    }
]
```

Now we want to know how many requests/second this endpoint can handle. In other words how many max users can use this endpoint at the same time.

This is an obvious question being frequently asked from software developers.

Now, that we have an end point and we need to load test it. First thing we need an extra server i.e ‘attack server’ which will host Gatling to simulate high number of requests. You can get more details about how to install Gatling on their official website.

Gatling simulation class contains three sections:

+ Configuration
+ Scenarios
+ Launch Setup

My simulation class looks like this:

```
package hoteldatabase // 1

import io.gatling.core.Predef._ // 2 
import io.gatling.http.Predef._
import io.gatling.core.feeder._
import scala.concurrent.duration._

class RoomInfoEndpoint extends Simulation { // 3
    val getRandomHotelIdentifier = csv("hotels.csv").random

// configuration
    val httpConf = http // 4
            .baseUrl("https://example.com/api/") // 5
            .acceptHeader("application/json") // 6
            .userAgentHeader("Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0")

// Scenario
    val scn = scenario("RoomInfoEndpoint") // 7
        .forever { // 8
        feed(getRandomHotelIdentifier) // 9
            .exec(http("request_1") // 10
                .get("${‘HotelIdentifier’}/rooms")) // 11
                .pause(3) // 12
    }

// Launch setup
    setUp( // 13
        scn.inject(rampUsers(1000) during (2 minutes))) // 14
            .protocols(httpConf) // 15
        .maxDuration(10 minutes) // 16
}
```

Let me explain each section in details.

1. It is optional package name, if provided it’ll be shown while running the simulations. Recommended to use it .
2. The required imports. These are Gatling packages that must be imported before declaring the simulation class.
3. Class declaration. Remember that it must extend Simulation class.
4. The common configuration to all HTTP requests.
5. The base URL that will be prepended to all relative URLs.
6. Common HTTP headers that will be sent with all HTTP requests.
7. The scenario definition. It is a string that could be anything you want.
8. Will run this scenario forever depending upon the launch setup (we’ll explain it later)
9. Feed hotel slug identifier from a csv file.
10. A HTTP request, named request_1. This name will be displayed in the final reports.
11. The url, this request targets with the GET method.
12. Some pause/think time after each request.
13. Setup to launch scenarios been sets up.
14. Declaring to inject users in scenarios. In this case 1000 users are being injected with in 2 minutes. Which means initially the users will start from low number and will ramped to 1000 users with in 2 minutes of time. This is so the traffic is increasing slowly instead all of the users launched immediately.
15. Attaching the HTTP configuration declared above.
16. The scenario will be ended after 10 minutes.

After setting simulation, it can be run using the following command: Linux/Unix: $GATLING_HOME/bin/gatling.sh On Windows:

`$GATLING_HOME/bin/gatling.bat`

You should see a menu with the simulation examples:
```
Choose a simulation number:
[0] hoteldatabase.RoomInfoEndpoint
```

When the simulation is done, the console will display a summary report and also show a link to the HTML detailed reports.

Along with other details, the reports will show:

- Total requests sent
- Total requests passed through i.e received 20* http response code
- Total requests failed
- Mean time took by each request

It is recommended to perform load test on your production environment so that you can know the real picture of your production system. It is better to do load-test in less traffic hours so that your clients do not get much effected.

I hope you get some understanding about how to perform end-to-end load test your production application. For further details, please follow [Gatling - Advance Tutorial](https://gatling.io/docs/current/advanced_tutorial/#advanced-tutorial)