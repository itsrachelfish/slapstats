SlapStats is a project to generate statistics of all the times people use the !slapanus and !poisonshits families of commands in #wetfish.

As of January 31, 2015 channel logs will no longer be provided. If you want to use this project on your own you'll need to generate a slap log!

The following command can be used to generate a slap log from irssi chat logs:

```
grep -E "> !(slap|super)|Day changed" irclogs/wetfish/#wetfish.log > slaplog.txt
```
