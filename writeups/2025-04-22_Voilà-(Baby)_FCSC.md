# Voilà (Baby) [INTRO] [MISC]

## Description

Alice loves listening to music. Unfortunately, she misconfigured her firewall and accidentally exposed her music collection on the Internet. Alice organizes her personal collection in an unconventional way: instead of sorting by genre, album, or artist, she renames her music files based on her imagination.

To begin, connect to her music collection and find the hidden flag in the metadata.

Alice's music collection is accessible at `nc chall.fcsc.fr 2052`.

## Finding the flag

Let's connect to the service using `netcat`.

```terminal
$ nc chall.fcsc.fr 2052
OK MPD 0.23.5
```

Once connected, we can see that the service is running MPD (Music Player Daemon) version 0.23.5. This indicates that we can interact with the music collection using MPD commands.

While going through the documentation of MPD, we find that it has a command called `listallinfo`, which lists all the songs in the library along with their metadata. This command is useful for finding hidden flags in the metadata.

```terminal
$ listallinfo
file: chat.opus
Last-Modified: 2025-04-13T18:50:50Z
Format: 48000:16:1
Time: 95
duration: 95.476
file: crypto.opus
Last-Modified: 2025-04-13T18:50:50Z
Format: 48000:16:1
Time: 65
duration: 64.789
file: dinosaur.opus
Last-Modified: 2025-04-13T18:50:50Z
Format: 48000:16:1
Time: 43
duration: 43.471
file: flag.opus
Last-Modified: 2025-04-13T18:50:50Z
Format: 48000:16:2
Time: 87
duration: 86.726
file: junior.opus
Last-Modified: 2025-04-13T18:50:50Z
Format: 48000:16:1
Time: 305
duration: 304.553
file: reboot.opus
Last-Modified: 2025-04-13T18:50:50Z
Format: 48000:16:1
Artist: FCSC{da73b72ebff9d887d6e329a50da3fe470439d5ad1a530dea04dd382f63e79b5f}
Time: 35
duration: 35.261
OK
```

The output shows several music files with their metadata. The most interesting one is the `reboot.opus` file, which contains an `Artist` field with a string that contains the flag.
