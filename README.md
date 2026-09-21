# User Search

User search with debounce, handling of four loading states, and renders API data with textContent to prevent XSS.

## What it does
It searches for users by name on a public API. The matching is case-insensitive.

## Technical decisions

### 700 ms Debounce
← What would happen without it: one request per keystroke, six when typing "paula".
   I chose 700ms because it feels faster for the user and is enough time for a person to continue typing a name on the keyboard.

### The four states
← Loading, error, empty, results.
    empty is NOT an error: "no matches" is a 200 status with an empty list, not a 404. The search was successful.

### Checking `newUsers.ok`
← it's because fetch doesn't reject on 404 or 500, and the error must be thrown manually so it reaches the `.catch` block.

### `textContent` instead of `innerHTML`
← The data comes from an API. XSS prevention.

## Known limitations
← Race condition: if the user types, stops, and continues, two searches might be in flight and arrive out of order. This would be solved using an `AbortController`.
← Ten users are requested on each search. I fetch the data on every search to guarantee it is up to date; the trade-off is one request per search.
←  any mistakes that is not HTTP is shown as "errordeRed" including possible bugs on the code.

## Stack
Vanilla JavaScript, HTML, CSS. No dependencies.