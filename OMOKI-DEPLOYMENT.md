# Omoki publication

- Public URL: https://orbclinic.pages.dev/omoki/
- Cloudflare Pages project: `orbclinic`, production branch: `main`.
- Source: `public/omoki/`. Keep this directory in every clinic deployment.
- Build with `npm ci` and `npm run build`; deploy the complete `dist/client`
  directory, never just the quiz directory (that would remove clinic pages).
- Regression checks: `node --test tests/omoki-static.test.mjs tests/site-export.test.mjs tests/analytics.test.mjs`.

The standalone quiz has no answer persistence, contact form, analytics, or answer
transfer to the clinic. Its result footer links to the existing Naver Talk,
booking, and Place destinations. Character stories are entertainment, not
clinical assessments. Gallery/result links use URL fragments and do not expose
answers.

`share-config.js` contains the production URL. Kakao's JavaScript key is not yet
configured: copying a result link works, but direct Kakao sharing must not be
advertised as enabled. To enable it, register the production origin with Kakao
and supply its public JavaScript key (never an admin or REST key). Update the
configuration test when doing so.

The original editable preview is at
`designs/omoki-preview/` in the owner's local workspace. It is not part of the
clinic's deployed source. Publication uses the self-contained directory above,
including vendored illustrations, logo, icons, and font.
