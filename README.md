# Pinnacle Strategic Advisory - Website

Static GitHub Pages site for **pinnaclestrat.com**.

Built for Matthew S. Cruz / Pinnacle Strategic Advisory, LLC.
Separate from Nano Cube USA infrastructure.

---

## Brand decisions confirmed by Matthew (May 4, 2026)

- **Colors:** Navy `#0A1F3D` + Gold `#C9A961` + White background.
  Light warm-white `#F7F5F0` used for zoned sections.
- **Typography:** Fraunces (display serif) + DM Sans (body sans), both
  Google Fonts, free.
- **Logo:** Path A confirmed. Wordmark only - "PINNACLE" set in Fraunces
  uppercase serif with a gold dot accent. No custom mark. Same wordmark
  in nav, footer, and 404. Favicon is a navy square with serif "P".
- **Principals:** Solo Matthew launch. Single bio on About page.
  Add principals later when revenue justifies.
- **Phone:** Google Voice line pending Joseph's provisioning. Not on
  the site until provisioned. Free, routes to Matthew's cell.
- **Domain:** `pinnaclestrat.com` (the one Matthew actually purchased,
  not the longer `pinnaclestrategic.com` from the PDF).
- **Email shown on site:** `info@pinnaclestrat.com` (will resolve once
  Google Workspace is provisioned).

---

## File structure

```
pinnacle-site/
├── index.html          Home (hero, trust bar, services, method, CTA)
├── services.html       Three service detail blocks
├── about.html          Position, principles, principal bio
├── process.html        4-phase Pinnacle Method, with deliverables
├── contact.html        Calendly placeholder, fallback form, contact info
├── 404.html            Not-found page
├── css/style.css       All styles. Navy + gold. CSS vars at top.
├── js/main.js          Mobile menu, sticky header, fade-in observer
├── CNAME               Custom domain: pinnaclestrat.com
├── .nojekyll           Disables Jekyll processing
├── robots.txt          Search engine directives
└── sitemap.xml         For Google Search Console submission
```

---

## Deploy to GitHub Pages

### 1. Create the repo

```bash
cd pinnacle-site
git init
git add .
git commit -m "Initial Pinnacle site"
git branch -M main
git remote add origin https://github.com/<your-account>/pinnacle-site.git
git push -u origin main
```

Recommend a dedicated org or personal account separate from the Nano Cube
GitHub. Do not push to `Ha-C-Repo/nanocube-virtual-office`.

### 2. Enable Pages

Repo → Settings → Pages

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Save

Wait 1-2 min for first deploy. Site will be live at
`https://<account>.github.io/<repo>` until DNS is wired.

### 3. Custom domain (pinnaclestrat.com)

The `CNAME` file is already in the repo. After Pages is live:

Repo → Settings → Pages → Custom domain → enter `pinnaclestrat.com` → Save
Tick **Enforce HTTPS** once GitHub finishes the cert provisioning (15-60 min).

---

## DNS records to add at GoDaddy

Log into GoDaddy → My Products → DNS for `pinnaclestrat.com`.

### Apex (pinnaclestrat.com) - point to GitHub Pages IPs

Add these four **A records**:

| Type | Name | Value           | TTL  |
|------|------|-----------------|------|
| A    | @    | 185.199.108.153 | 600  |
| A    | @    | 185.199.109.153 | 600  |
| A    | @    | 185.199.110.153 | 600  |
| A    | @    | 185.199.111.153 | 600  |

### www subdomain (optional but recommended)

| Type  | Name | Value                       | TTL |
|-------|------|-----------------------------|-----|
| CNAME | www  | `<account>.github.io`       | 600 |

(Replace `<account>` with the GitHub username or org that owns the repo.
Do not include the repo name. GitHub resolves the right repo via the
CNAME file in the repo.)

### Email (when Google Workspace is provisioned)

When `info@pinnaclestrat.com` is set up, add the Workspace MX records.
Google will give them at provisioning time. Standard set:

```
@  MX  1   smtp.google.com
```

(Modern single-record format. Google switched from the older 5-record
list in 2023.)

Plus SPF + DKIM + DMARC (TXT records, also from Workspace setup).

### Propagation

A records: 5-60 min typical.
GitHub HTTPS cert provisioning: up to an hour after DNS resolves.
Verify with: `dig pinnaclestrat.com +short` (should return the four IPs).

---

## What still needs Matthew or Joseph

### Pending Matthew

- **Bio on About page.** Placeholder paragraph in `about.html` is marked
  with an HTML comment `BIO PLACEHOLDER`. Replace with his real bio when
  he writes it.
- **Headshot photo.** The principal card shows a styled "M" monogram.
  Drop a square headshot into `assets/matthew.jpg` (recommend 600x600
  JPG) and swap the `<div class="principal-photo">` for an `<img>` tag.
- **LinkedIn URL.** Footer LinkedIn link is `#`. Replace with his
  personal or company LinkedIn URL.
- **Phone line.** No phone listed. Decide if Google Voice line is
  wanted, or stay email-only.

### Pending Joseph (IT)

- **GoDaddy DNS records** above (the unblock).
- **Google Workspace** provisioning for `hello@`, `matthew@`,
  `billing@`, `partnerships@`, `newsletter@` aliases. ~$7/user/mo.
- **Calendly account** at `calendly.com/pinnaclestrat` (or whatever
  username Matthew picks). Then swap the placeholder block in
  `contact.html` for the live embed (instructions are in the file).
- **Google Analytics 4** property. Drop the GA4 tag in the `<head>` of
  every HTML file once you have the measurement ID.
- **Google Search Console** verification + submit `sitemap.xml`.
- **Google Business Profile** at business.google.com.

---

## Brand tokens

Defined as CSS variables in `css/style.css` top of file. Change once,
applies everywhere.

```css
--navy-900: #0a1f3d;   /* primary brand navy - confirmed */
--gold-500: #c9a961;   /* accent gold - confirmed */
--cream:    #ffffff;   /* white background - confirmed */
--cream-dark: #f7f5f0; /* warm near-white for zoned sections */
--ink:      #1a1a1a;   /* body text */
```

Typography: Fraunces (serif headings) + DM Sans (body), both Google
Fonts. Fraunces uses variable-axis optical sizing for premium feel.

---

## Voice rules already applied

The PDF copy was edited through Matthew's voice filter before being
placed on the site:

- All em-dashes replaced with periods or hyphens
- En-dashes in number ranges replaced with hyphens (e.g. "60-90 days")
- Three-adjective lists replaced with single-noun statements
- "It's not just X, it's Y" structures eliminated
- AI-tells like "leverage", "synergy", "ecosystem" never used

If you add copy later, keep the same filter. See `brand-voice.md` in the
Nano Cube project knowledge for the full rule set.

---

## Maintenance

This is a static site. No build step. No database. No CMS.

To edit copy: open the `.html` file in any editor, change the text,
commit, push. GitHub Pages rebuilds in ~1 minute.

To change brand colors: edit the `:root` block at the top of
`css/style.css`. One change applies everywhere.

To add a page: copy `services.html`, change the title and content,
update the nav menu in **all** files (nav is duplicated in each HTML
file, no shared header partial because no Jekyll).

---

Built May 4, 2026. Joseph Hasse, Director of I.T.
