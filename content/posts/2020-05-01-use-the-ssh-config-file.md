---
title: Simplifying ssh connections with ssh configuration file
date: "2020-05-01T11:20:37.121Z"
template: "post"
draft: false
slug: "using-ssh-config-file"
category: "SSH"
tags:
  - "ssh"
  - "terminal"
description: "Simplifying ssh connections with ssh configuration file"
socialImage: "/media/ssh-config.jpg"
---

![ssh-config.jpg](/media/ssh-config.jpg)

---

Frequently connecting to remote server over ssh either requires a good memory or good 
documentation file. In both these cases, you still need to type-in or look around for 
ip/username of the server, password, port etc, which isn't something developers tend to 
embrace.

Here comes **ssh configuration** file to simplify remote server connectivity.

In this article, I'll try to explain some common commands of the ssh configuration file.

### SSH config file
The SSH config file isn't created automatically while installing SSH on your machine. The `config`
file needs to be placed into your `.ssh` folder. Default location is `~/.ssh`. Let's create it:

```bash
touch ~/.ssh/config
```

### Common options
- **Host** can contain one pattern or a whitespace-separated list of patterns.
- **Hostname:** the hostname or IP address of your remote server. You can skip this definition if the *Host* identifier already specifies the actual hostname you want to connect with.
- **User** the connection username.
- **Port** the port where your remote SSH server is listening for connections. Default value `22`.
- **IdentityFile** specifies a file from which the user's identity key is read when using public key authentication. The default for protocol version 1 is `~/.ssh/identity;` and `~/.ssh/id_rsa` or `~/.ssh/id_dsa` for protocol version 2.

### Examples

Typically, when connecting to a remote server via SSH you would specify the remote user name, hostname, and port. For example, to log in as a user named `john` to a host called `dev.example.com` on `port 2322` from the command line, you would type:

```
ssh john@dev.example.com -p 2322
```

To connect to the server using the same options as provided in the command above simply by typing `ssh dev`, put the following lines to your `~/.ssh/config` file:

```bash
Host dev
    HostName dev.example.com
    User john
    Port 2322
```

Now when you type `ssh dev`, the ssh client will read the configuration file and use the connection details that are specified for the `dev` host:


Detailed example of a shared `config` file:

```
Host targaryen
    HostName 192.168.1.10
    User daenerys
    Port 7654
    IdentityFile ~/.ssh/targaryen.key

Host tyrell
    HostName 192.168.10.20

Host martell
    HostName 192.168.10.50

Host *ell
    user oberyn

Host * !martell
    LogLevel INFO

Host *
    User root
    Compression yes
```

When you type `ssh targaryen`, the ssh client reads the file and apply the options from the first match, which is Host `targaryen`. Then it checks the next stanzas one by one for a matching pattern. The next matching one is Host * !martell (meaning all hosts except martell), and it will apply the connection option from this stanza. The last definition Host * also matches, but the ssh client will take only the Compression option because the User option is already defined in the Host `targaryen` stanza.

The full list of options used when you type `ssh targaryen` is as follows:

```
HostName 192.168.1.10
User daenerys
Port 7654
IdentityFile ~/.ssh/targaryen.key
LogLevel INFO
Compression yes
```

When running `ssh tyrell` the matching host patterns are: `Host tyrell`, `Host *ell`, `Host * !martell` and `Host *`. The options used in this case are:

```
HostName 192.168.10.20
User oberyn
LogLevel INFO
Compression yes
```

If you run `ssh martell`, the matching host patterns are: `Host martell`, `Host *ell` and `Host *`. The options used in this case are:

```
HostName 192.168.10.50
User oberyn
Compression yes
```

For all other connections, the ssh client will use the options specified in the `Host * !martell` and `Host *` sections.

### Conclusion

We’ve shown you how to how to configure your user `ssh config` file. By default, SSH listens on `port 22`. [Changing the default SSH port](https://linuxize.com/post/how-to-change-ssh-port-in-linux/) adds an extra layer of security to your server by reducing the risk of automated attacks.

If you have any questions, please leave a comment below.