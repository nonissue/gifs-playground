# node-gtfs

wow, way better experience this time. I dunno why I had so many issues with this before.

What I've done so far:

1. Installed `node-gtfs` globally with `npm`
2. Created a new dir in my existing project called `node-gtfs-data`. This is not intended to be permanent.
3. Created a `config.json` file in `node-gtfs-data` that I can provide to `node-gtfs` when running `gtfs-import` script.
4. Now, using the following command, a seemingly working `sqlite3` database is created and populated in quite short order:

```bash
gtfs-import --configPath node-gtfs-data/config.json
```

Very, very promising start. I played around with this a few weeks and remember running into countless issues (I think related to ETS' usage of ONLY `calendar_dates.txt` in the `GTFS.zip` rather than the more convention combo of `calendar.txt` and the aforementioned cal dates).

I haven't written anything programmatic, but it's awesome that the
