---
layout: post
title:  "Syslog, A Tale Of Specifications"
date:   2016-06-06 09:56:46
author: "Gina Maini"
category: ocaml
tags:
- mirage
- programming
- syslog
---

If A Unikernel Falls In The Woods...
==

I'm the [Outreachy] intern for [MirageOS] (part of [Xen]) which is a
library operating system written in [OCaml] that constructs [unikernels]
which can be deployed to the cloud or various mobile platforms. The
advantage of a unikernel work cycle is many-fold. You get [performance
benefits] from not having a memory management unit or Kernel/User
boundary and the attack surface is greatly minimized as all system
dependencies are compiled with your application logic. Don't use a
file-system in your application? Leave it out. The philosophy here is
keep it simple and use what you need. These unikernels are also the
secret sauce for how [Docker Beta] natively works on Windows and MacOSX.

I'm specifically focusing on hacking on the Mirage implementation of
Syslog which was started by Jochen Bartl ([verbosemode], lobo on IRC)
who is an all around awesome guy to work with. This is Jochen's first
big OCaml project (mine too) and has already proven how capable and
passionate he is by leading the charge. OCaml is a great functional
systems language for [many reasons]; mainly safety, blazing fast
performance, and powerful expressiveness. To apply to work as an
outreachy intern, I had to submit a flagship [patch] where I used
[irmin] (a pure OCaml distributed database a-la-git-style) for
in-memory storage with some commented out code for saving to a file
system. That means you could do a `git log` in a specified directory
of your choosing and see a git history of syslog events on the
host. Fun stuff!

There has previously been a lot of confusion and [misinformation] on
the types of tooling Mirage will ship with and what a production
environment for unikernels will be like (debugging, diagnostics, etc).
These arguments are mainly business driven but sometimes they are just
harmless misunderstandings of what the capabilities of these
unikernels will be.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en"
dir="ltr">Hi <a href="https://twitter.com/jxxf">@jxxf</a>, I&#39;ve
shipped code for MirageOS&#39;s Syslogd implementation. It&#39;s
incorrect to say it won&#39;t be available out of box, just not
finished</p>&mdash; Gina Marie Maini (@wiredsis) <a
href="https://twitter.com/wiredsis/status/721113224628731904">April
15, 2016</a></blockquote>

But make no mistake, debugging and tracing tools [will] and [do
exist]. They will just be written in OCaml and compiled with your
application.

What is the Syslog protocol?
==

The Syslog is a standard protocol to convey event notification
messages. Mirage's goal is to have a standalone unikernel
receiver/collector of Syslog messages that could parse them and store
them, but there are other types of Syslog devices that should be
unikernels; like a relay (to forward syslog messages) and a
client/sender of messages.

Here is the interface file for the repository syslog-message:

<script src="https://gist.github.com/wiredsister/43fff5d29b186cb1e509acfb6c535b61.js"></script>

The types make it easy to read here, but basically there are two
important concepts that make up the abstract syslog message type:
faciliy and severity. Facility here is a broad category that either an
operating system, processes, or application would quantify their
messages into. Severity is just like what it sounds-- how important
is this message? If the message is high severity, maybe the network
administrator would like to forward those important messages to other
devices. This would be important because Syslog doesn't deal with lost
messages, recovery, or acknowledgement in any way. Like most things on
the internet it's up to you to figure out what to do, cowboy.

The Syslog protocol is over 30 years old, born out of the Sendmail
project (an internetwork email routing facility supporting SMTP and
other assorted mail network protocols). If you squint hard enough,
you'll find implementations nearly everywhere; lurking on many
unix-like systems, network devices, and routers. It existed for many
years without a published standard and thus, many previous
implementations are not standardized and are incompatible with
today's RFCs.

Mirage's Syslog (both [daemon] and [parser]) are following [RFC 3164]
which is the observed behavior of the implementation that shipped
with BSD and later standardized in [RFC 5424]. We are also going by
[RFC 5426] which is for passing Syslog messages over UDP. In the long
term, we'd like this to be happening over SSL/TLS and not plaintext,
following [RFC 5425]. Maybe if we get really fancy, we'll have
implemented date and time up to [specification] as well as ushering in
[IPv6].

Systems Coding in OCaml For Fun and ???
==

Feel like joining in? Jump on the [mailing list] or say hi on #mirage
(freenode). Worried you won't know enough OCaml or haven't worked on a
systems project before? No worries. Neither do/have I. Just keep
swimming and dance to the beat of your own drum. And speak up, ask for
help. If you come to a project and have no idea how to jump in, file an
issue and say so. You're not the first and you won't be the last. The
mirage peeps are friendy and excited to help.

[Outreachy]: https://www.gnome.org/outreachy
[OCaml]: https://ocaml.org/
[MirageOS]: https://mirage.io
[Xen]: http://www.xenproject.org/
[unikernels]: https://queue.acm.org/detail.cfm?id=2566628
[performance benefits]: https://matildah.github.io/posts/2016-01-30-unikernel-security.html
[Docker Beta]: https://blog.docker.com/2016/03/docker-for-mac-windows-beta/
[verbosemode]: https://github.com/verbosemode
[many reasons]: http://www.gina.codes/ocaml/2016/02/14/dear-ocaml-i-love-you.html
[patch]: https://github.com/verbosemode/syslogd-mirage/pull/3
[irmin]: https://github.com/mirage/irmin
[misinformation]: https://news.ycombinator.com/item?id=10953766
[daemon]: https://github.com/verbosemode/syslogd-mirage
[parser]: https://github.com/verbosemode/syslog-message
[RFC 3164]: http://www.rfc-base.org/txt/rfc-3164.txt
[RFC 5424]: http://www.rfc-base.org/txt/rfc-5424.txt
[RFC 5426]: http://www.rfc-base.org/txt/rfc-5426.txt
[will]: https://github.com/mirage/mirage-www/wiki/Pioneer-Projects
[do exist]: https://github.com/mirage/mirage-logs
[RFC 5425]: http://www.rfc-base.org/txt/rfc-5425.txt
[IPv6]: http://www.rfc-base.org/txt/rfc-4291.txt
[specification]: http://www.rfc-base.org/txt/rfc-3339.txt
[mailing list]: http://lists.xenproject.org/cgi-bin/mailman/listinfo/mirageos-devel
