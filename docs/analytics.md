# Analytics operations

## Production scope

`app/layout.tsx` loads the first-party `/orb-analytics.js` bootstrap. It requests
Google Analytics only when the runtime host is exactly `orbclinic.pages.dev`
over HTTPS. Localhost, IP addresses, Cloudflare preview hosts and other site
copies do not load the Google tag from this version. Update the explicit
allowlist deliberately when the production domain changes.

`/internal-traffic`, `/admin` and `/design-system` (including child paths) are
excluded. A central delegated listener measures clicks on every page, including
links rendered later and browsers with reduced motion enabled. `SiteMotion`
only handles visual effects.

## Staff / owner browser exclusion

Open `https://orbclinic.pages.dev/internal-traffic` in each browser/profile/device
used for site maintenance and select **이 브라우저의 접속 제외하기**. This saves
`orb.analytics.internal.v1=1` to that origin's local storage and disables the GA
tag for that browser. Existing tabs running an old deployment should be reloaded.

Exclusion can be reversed on the same page. Other browsers, private windows,
devices and domains are not automatically opted out. Clearing site data removes
the setting. No names, IP addresses or staff identifiers are collected.

Storage failures fail closed (no collection). The page is excluded from analytics
and search indexing, and is intentionally not listed in the sitemap. This is a
local analytics preference, not an authentication or admin-access mechanism.

## Events and key events

The existing event names are retained:

- `booking_click`: Naver booking link click
- `phone_click`: telephone link click
- `kakao_chat_click`: Kakao channel link click
- `map_click`: recognized map/place link click

Only `cta_type`, `destination_host` and the GA destination ID are explicitly
attached. Link text, phone numbers and URL query strings are not added to custom
click payloads. Google enhanced measurement may collect its own automatic events.

On 2026-10-10, `booking_click`, `phone_click` and `kakao_chat_click` were marked as
key events in GA4 property 556766508 after owner approval; all three appeared in
the saved key-events list. They represent **outbound intent**, not confirmed
bookings, connected calls or sent chats. Do not sum event-level users as unique
patients. Do not mark generic `click`, `page_view` or `form_submit` as a booking.

Automatic GA pageviews are preserved. Do not add manual history/pageview events
without first coordinating the enhanced-measurement settings, or views may be
duplicated. The guard sets `ga-disable-<measurement-id>` before excluded navigation
and rechecks history, storage changes and browser back/forward restoration.

## Verification

Run `npm run test:analytics`, `npx tsc --noEmit` and `npm run build`.
The Node tests use a fake browser/Google interface and send no real events.
Check the excluded-browser page in a local browser: enable, refresh, confirm it
persists, disable, confirm it changes. Production smoke tests should use the
excluded settings page or an opted-out browser, not manufacture real leads.

In GA4, inspect Admin → Events → Key events. For historical reporting, use an
exact hostname filter for `orbclinic.pages.dev` to separate the mixed data.
Browser exclusion and new code do not rewrite historical data. Older deployed
copies and development servers that have not received the guard can still send
data; the GA4 filter below provides an additional processing-side exclusion for
the specified hostnames, but does not update those copies' code.

## GA4 hostname exclusion

On 2026-10-10, after owner approval, `ORB Dev Preview Exclusion` was saved in
property 556766508 and verified as **Active**. It is a web hostname traffic
filter with the **Exclude** operation and these OR conditions:

- Hostname exactly matches `localhost`.
- Hostname exactly matches `127.0.0.1`.
- Hostname ends with `.orbclinic.pages.dev` (the leading dot is required).

This excludes future local/preview events, including events sent by older copies
without the client-side guard. It does not exclude the production hostname
`orbclinic.pages.dev`, the separate `orbclinic-renewal.pages.dev` project, or the
old `orb-korean-medicine-clinic.hyeranlee.chatgpt.site` hostname. Other local IPs
and preview projects are not covered. Filtered-out future data cannot be
recovered; historical data is unchanged. Do not broaden this filter without
checking the production and comparison-host requirements.

The pre-existing GA internal-traffic filter was observed in **Testing** mode on
2026-10-10. It was not activated because no employee IP ranges were verified.
Do not use Macintosh, Chrome or a shared clinic Wi-Fi network as a substitute
for identifying internal traffic.
