---
description: Full visual + behavioural QA pass, returns a ranked deficiency list
argument-hint: [route or "all"]
allowed-tools: Bash, Read, Glob, Grep, Agent
---

Run a QA pass on ${ARGUMENTS:-all routes} of this portfolio.

Load the `visual-qa` skill and follow it end to end: confirm (or start) the dev
server, screenshot each route at desktop and small width, read every screenshot,
then run `drive.mjs` for overflow, mobile menu, form validation and console
errors. Also run `npm run typecheck`, `npm run lint` and `npm run build`.

Report a numbered deficiency list, most severe first — file, what is wrong, what
it should be, how you observed it — separating confirmed from suspected, and
naming any check you could not run. Then fix what you found and re-verify.

Stop any dev server or Chrome instance you started; leave the user's alone.
