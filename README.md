# Clear Boundaries — Eleventy site with Decap CMS blog

This replaces the hand-coded `clear-boundaries-blog.html` with a proper blog
system: nine real articles are already loaded as markdown posts, the listing
page and individual post pages are generated automatically, and there's a
`/admin` panel where Abbie or Charlie can write and publish new posts without
touching code.

The four marketing pages (`index.html`, `psychosocial-consultancy.html`,
`psychosocial-training.html`, `workplace-investigations.html`) are untouched —
they're copied through as-is and don't go through any templating.

**Important:** this scaffold was built without a live internet connection, so
it hasn't been run through an actual `npm install` / build here. The commands
below are the standard, correct steps for a project like this — please run
them locally (or hand them to a developer) and let me know if anything
errors, so I can fix it directly rather than guessing twice.

## 1. Install locally

You'll need [Node.js](https://nodejs.org) installed (any recent LTS version).

```bash
cd clear-boundaries-site
npm install
```

## 2. Preview it on your machine

```bash
npm run serve
```

This starts a local server (Eleventy will print the address, usually
`http://localhost:8080`) and rebuilds automatically as you edit files.
Check that:

- The homepage, service pages, and blog all look right
- `/blog/` shows all nine posts plus the featured one at the top
- Clicking into a post shows the full article with header/footer intact

## 3. Put it in a Git repository

Decap CMS (the admin panel) saves content by committing directly to a Git
repo, so the project needs to live on GitHub (or GitLab/Bitbucket) connected
to Netlify.

```bash
git init
git add .
git commit -m "Initial Eleventy + Decap CMS setup"
```

Then create a new repository on GitHub and push it there, following GitHub's
instructions for an existing local repo.

## 4. Connect it to Netlify

In the Netlify dashboard: **Add new site → Import an existing project**, and
point it at the GitHub repo. Netlify will read `netlify.toml` automatically
and use `npm run build` / publish the `_site` folder — no manual config
needed.

## 5. Turn on the CMS login (Netlify Identity + Git Gateway)

This is the one-time step that makes `/admin` actually work:

1. In the Netlify dashboard for this site, go to **Site configuration →
   Identity**, and enable Identity.
2. Under Identity settings, set registration to **Invite only** (so random
   people can't sign themselves up).
3. Go to **Identity → Services** and enable **Git Gateway**.
4. Under **Identity → Invite users**, invite Abbie's and Charlie's email
   addresses. They'll get an email to set a password.
5. Visit `yoursite.com/admin` and log in with those credentials.

From that point on, publishing a post is: log in at `/admin`, click **New
Blog Posts**, fill in the title/date/category/excerpt/body, hit **Publish**.
Netlify rebuilds automatically and the post is live within a minute or two.

## 6. Point the real domain at it (optional, once you're happy)

If this is replacing the current Netlify mockup or going live on a new
domain, add the domain under **Site configuration → Domain management** in
Netlify, and update DNS at wherever the domain is registered, per the exact
records Netlify shows you.

## Notes on what's already in place

- **Nine real posts** are pre-loaded in `src/blog/posts/`, using the actual
  WorkSafe/OHS Act articles and the Consultation in Construction piece.
  "Victoria's Psychological Health Regulations 2025" is flagged as the
  featured post — untick its `featured` field in the CMS (or tick a
  different post's) to change which one is featured.
- **Publish dates** on the pre-loaded posts are placeholders spaced roughly a
  week apart, since the originals didn't specify real publish dates (only the
  Consultation piece did: August 2026). Worth adjusting these to the actual
  dates you'd publish them, since they control sort order on the listing page.
- **Categories** are: Regulatory updates, Employer duties, Consultation &
  training. The filter buttons on the blog page work off these live.
- Everything reuses the exact fonts, colours, header (with the dropdown and
  founders photo), and footer already built for the rest of the site — new
  posts will automatically match, no design work needed per post.
