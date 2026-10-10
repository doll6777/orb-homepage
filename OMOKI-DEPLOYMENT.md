# Omoki publication

- Public URL: https://orbclinic.pages.dev/omoki/
- Cloudflare Pages project: `orbclinic`, production branch: `main`.
- Source: `public/omoki/`. Keep this directory in every clinic deployment.
- Build with `npm ci` and `npm run build`; deploy the complete `dist/client`
  directory, never just the quiz directory (that would remove clinic pages).
- Regression checks: `node --test tests/omoki-static.test.mjs tests/site-export.test.mjs tests/analytics.test.mjs`.

The standalone quiz has no answer persistence, contact form, analytics, or answer
transfer to the clinic. The quiz has no symptom-based care invitation or direct
Talk, booking, or Place links. The clinic logo links to its homepage and the
footer credits ORB. Character stories are entertainment, not clinical
assessments. Gallery/result links use URL fragments and do not expose answers.
This content change is not medical-advertising approval or a review exemption.

`share-config.js` contains the production URL. Kakao's JavaScript key is not yet
configured: copying a result link works, but direct Kakao sharing must not be
advertised as enabled. To enable it, register the production origin with Kakao
and supply its public JavaScript key (never an admin or REST key). Update the
configuration test when doing so.

The original editable preview is at
`designs/omoki-preview/` in the owner's local workspace. It is not part of the
clinic's deployed source. Publication uses the self-contained directory above,
including vendored illustrations, logo, icons, and font.
