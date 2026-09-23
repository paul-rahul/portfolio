# Claude Code Task — Replace Website Favicon / App Icon

## Goal

Replace the current website tab/favicon icon with the new Rahul Paul icon set provided in this package.

The icon must work cleanly across:
- browser tabs
- high-DPI displays
- desktop browsers
- mobile browsers
- Apple touch icons
- Android / Chromium installable shortcuts
- Day and Night website modes

Do not redesign the site or change unrelated visual elements.

## Provided files

```text
favicon.ico
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
apple-touch-icon.png
android-chrome-192x192.png
android-chrome-512x512.png
icon-192.png
icon-512.png
favicon-master-1024.png
site.webmanifest
```

Use the supplied assets directly unless the current project structure requires equivalent filenames.

Do not regenerate or recolor the icon unless there is a verified technical problem.

## Design intent

The icon follows the current Technical Editorial identity:
- dark charcoal rounded-square base
- white editorial serif `R`
- cobalt accent dot
- cobalt underline
- restrained and premium
- readable in both light and dark browser chrome

The website already supports Day / Night modes.

The favicon itself does not need to change between Day and Night modes unless the current implementation already supports theme-aware favicons and there is a strong reason to retain that behavior.

## Git workflow — required

### 1. Start from the current approved branch

Before changing anything:

1. Read:
   - `CLAUDE.md`
   - `AGENTS.md`
   - `PRODUCT.md`
   - `DESIGN.md`
   - project memory / `REDESIGN_MEMORY.md` if present
2. Inspect current branch structure.
3. Identify the latest approved branch containing the current website.
4. Pull the latest state.

### 2. Create a new task branch

Create:

```text
chore/favicon-refresh
```

Example:

```bash
git checkout <latest-approved-branch>
git pull origin <latest-approved-branch>
git checkout -b chore/favicon-refresh
```

Do not make these changes directly on `main`.

Do not raise a PR yet.

## Implementation

### 3. Inspect existing favicon configuration

Check:
- `src/layouts/BaseLayout.astro`
- any shared `<head>` component
- `public/`
- current `favicon.svg`
- current `favicon.ico`
- any existing manifest
- Apple touch icon configuration
- PWA metadata

Do not remove unrelated metadata.

### 4. Copy assets into the correct public directory

For Astro, use `public/` unless the project clearly uses another convention.

Expected structure:

```text
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest
```

Keep `favicon-master-1024.png`, `icon-192.png`, and `icon-512.png` only if useful.

### 5. Update head metadata

Recommended pattern:

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

Update existing metadata rather than duplicating it.

### 6. Preserve Day / Night behavior

Verify:
- Day mode still initializes correctly
- Night mode still initializes correctly
- theme persistence still works
- favicon changes do not interfere with theme initialization
- head ordering does not reintroduce theme flash

Do not change theme runtime unless absolutely necessary.

## DESIGN.md

If `DESIGN.md` documents brand marks, app icons, browser chrome, or favicon behavior, update it.

If no section exists, add a concise section describing:
- charcoal rounded-square
- white serif `R`
- cobalt dot/underline
- same asset across Day/Night
- primary favicon assets

## Validation before approval

Run:

```bash
npm run build
npm run dev
```

Verify:
- favicon appears in browser tab
- favicon looks crisp
- direct icon asset URLs resolve
- Apple touch icon resolves
- manifest resolves
- no favicon/manifest 404s
- Day mode works
- Night mode works
- mobile layout unaffected
- desktop layout unaffected

Where browser favicon caching interferes, hard-refresh or clear site data as needed.

# Approval gate — stop here

Once implementation and validation are complete:

**STOP.**

Do not:
- update project memory yet
- raise a PR
- merge anything
- merge to `main`

Present Rahul with:
1. branch name: `chore/favicon-refresh`
2. files changed
3. build status
4. local dev status
5. Day/Night validation status
6. exact preview command:

```bash
git checkout chore/favicon-refresh
npm install
npm run dev
```

Wait for Rahul to explicitly confirm the icon looks correct and the changes are working.

# After Rahul approves

Only after explicit approval:

## 7. Update project memory

Append a concise entry covering:
- favicon replacement
- Apple touch icon
- Android/Chromium icons
- manifest
- design treatment
- Day/Night validation
- build/dev status

If `DESIGN.md` changed, record that.

## 8. Commit

Use a clear commit message, e.g.:

```text
chore: refresh portfolio favicon assets
```

## 9. Push branch

```bash
git push -u origin chore/favicon-refresh
```

## 10. Raise PR

Open:

```text
chore/favicon-refresh
→
main
```

Review the diff for unintended changes.

## 11. Merge to main

Merge only after Rahul's approval has already been received.

## 12. Validate main

```bash
git checkout main
git pull origin main
npm install
npm run build
npm run dev
```

Verify the favicon again on `main`.

# Branch cleanup

Only after:
- PR is merged
- `main` is pulled locally
- build passes on `main`
- local dev works
- favicon is verified

delete the task branch locally:

```bash
git branch -d chore/favicon-refresh
```

If repository conventions permit and no active work depends on it, remove the remote branch too:

```bash
git push origin --delete chore/favicon-refresh
```

Do not force-delete unmerged work.

# Success criteria

The task is complete when:
- new icon appears in browser tabs
- favicon assets are crisp at common sizes
- Apple touch icon is present
- Chromium/Android icons are present
- manifest resolves
- Technical Editorial design remains unchanged
- Day/Night modes still work
- Rahul approved before PR/merge
- memory was updated only after approval
- PR was raised only after approval
- changes merged to `main`
- `main` validated
- task branch removed locally after merge
