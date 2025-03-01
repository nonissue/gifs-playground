# GTFS Playground

ETS GTFS Schedule Data: https://gtfs.edmonton.ca/TMGTFSRealTimeWebService/GTFS/GTFS.zip

## Initial Work

Okay after hours of struggling, I can compute stopovers and it works with ETS data (with caveats, see Issues below)

```bash
tsc src/gtfs-utils.ts; node src/gtfs-utils.js
```

produces working output (see: `./data/gtfs-utils-stopovers.txt`).

Before this started working, I was repeatedly getting an `Entries not found` error from `gtfs-utils` in the `zip.stream()` function. However, one or all of the following got things working:

- Setting timezone correctly to `America/Edmonton`
- Sorting the gtfs txt files using `sort.sh`
    - I actually don't think this fixed my initial issue, but it actually fixed a different error I would have run into otherwise
- Passing the actual `txt` files to `gtfs-utils` rather than trying to stream the zip on the fly.

    - So I guess something was going wrong with our zip streaming? Not sure. TBH the `gtfs-utils` library, example code, and docs are not great
    - In hindsight, `gtfs-utils` example code is bad. Consider [zip.js](https://github.com/public-transport/gtfs-utils/blob/master/examples/zip.js).

        - In the example, Promises are mixed with IIFE `async` rather than just using `async/await` properly
        - We have a Promise that doesn't actually return and also ` .then(() => new Promise(...))` is just unnecessary.
        - `.catch()` comes after the IIFE `async` function so only synchronous errors are caught.
        - Unhandled `await`'d promises inside the IIFE won't be caught if rejected.
        - Terrible function and variable naming.

## Issues

- Issue with the zip file:

    - I don't think it's related to `calendar.txt` not being present in my data since it works fine with a batch of text files with only `calendar_dates.txt`
    - I don't think the issue is related to underscores in the file names or any file name formatting problem as, again, if I our `readFile` function is passed the unzipped `.txt` files, it seems to work fine and I tried passing a `.zip` without any file with an underscore in it's name and the error still occurred.
    - INITIAL CONCLUSION: I don't fully understand the example and library code — it's a few years old and the author writes JavaScript in a way that I found very hard to follow. The dev mixes both `Promises`/callbacks and `await/async` code together and writes code with little clarity and high complexity.

- Issue with pushing to git because of enormous txt files
    - couldnt push to git because gtfs txt files were tracked
    - still in git history even after gitignoring them, so still cant push
    - tried bfg, didnt work, ultimately used the following:

```
git filter-branch --tree-filter "rm -rf node_modules" --prune-empty HEAD
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
echo node_modules/ >> .gitignore
git add .gitignore
git commit -m 'Removing node_modules from git history'
git gc
git push origin main --force
```

which caused the local files to be deleted I guess?

Fuck it caused all kinds of issues. Ultimately I pulled a clean copy of the repo from git, and then just tried to readd anything that was `.gitignored`.

okay, fuck, like two hours later, i think it's fixed? goddamn. if I have more issues I'm tossing the `.git` dir and starting over, fuck LINUS TORVALDS (jk)
