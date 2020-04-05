---
title: PDO::__construct() Unexpected server response while doing cache_sha2 auth 109
date: "2020-04-05T11:20:37.121Z"
template: "post"
draft: false
slug: "pdo-unexpected-server-response-while-doing-cache-sha2-auth"
category: "MySql"
tags:
  - "Database"
  - "Error"
  - "MySql"
description: "PDO::__construct(): Unexpected server response while doing cache_sha2 auth: 109"
---

You might have faced this problem before. This is actually due to the new authentication way of mysql introduced in version 8.0.11.

Don't be panic, solution is simple. Though I wasted few hours determining it :)

**Solution:** Log into mysql using terminal and run the following command:

```sql
ALTER USER root@localhost IDENTIFIED WITH caching_sha2_password BY 'password';
```

And

```sql{numberLines: true}
GRANT ALL PRIVILEGES ON {db}.* TO 'root'@'localhost';
```

Replace username, host, password and db accordingly.

Hope it saves your time.