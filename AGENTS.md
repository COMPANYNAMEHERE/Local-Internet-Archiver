# Agent Instructions

- Use two spaces for indentation and terminate statements with semicolons.
- Favor `const` over `let` when variables are not reassigned.
- Use `browser` WebExtension APIs; fall back to `chrome` for compatibility.
- Target Manifest V2 and avoid persistent background pages.
- Keep external tooling optional; `npm test` should run without network access.
- Persist user preferences to `browser.storage.local` when adding options pages.
- Manually verify that visiting a page creates an HTML file in the Downloads
  folder when archiving is enabled.

