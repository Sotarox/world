## Plan: Search Dialog Keyboard Shortcut

Implement cross-platform keyboard shortcut handling in SearchButton so Ctrl+K (Windows/Linux) and Command+K (macOS) trigger the same behavior as clicking the search button, while keeping existing click behavior and route-change close behavior intact.

**Steps**
1. Add a single open handler in SearchButton and reuse it for both click and keyboard shortcuts.
2. Introduce a shortcut constant (`k`) and a `useEffect` keydown listener in SearchButton that checks `event.key.toLowerCase() === 'k'` and `(event.ctrlKey || event.metaKey)`, then calls `event.preventDefault()` and opens the dialog. *depends on 1*
3. Register and clean up the global listener with `window.addEventListener('keydown', ...)` and `removeEventListener` in the effect cleanup to avoid leaks or duplicate handlers. *depends on 2*
4. Add `aria-keyshortcuts='Control+K Meta+K'` on the search trigger button so assistive tech exposes the shortcut hint. *parallel with 2*
5. Ensure route-change close effect remains unchanged and still closes the dialog on pathname updates. *validation during implementation*
6. Align tests in SearchButton test file to verify click, Ctrl+K, Meta+K, and unrelated key behavior pass against the updated implementation; remove/adjust any stale assertions unrelated to this requirement if present. *depends on 2*

**Relevant files**
- `/Users/sota/repo/world/frontend/src/components/world/search-button.tsx` — add keyboard shortcut listener and shared open handler; add `aria-keyshortcuts` on trigger button.
- `/Users/sota/repo/world/frontend/src/tests/search-button.test.tsx` — verify shortcut behavior and keep regression coverage for non-shortcut keys.
- `/Users/sota/repo/world/frontend/src/components/custom/sidebar.tsx` — reference existing cross-platform shortcut pattern (`event.metaKey || event.ctrlKey`) for implementation consistency.

**Verification**
1. Run SearchButton unit tests: `npm test -- src/tests/search-button.test.tsx` (or repo’s equivalent jest command) and confirm Ctrl+K and Meta+K tests pass.
2. Run type/lint check for touched files (repo-standard command) to ensure no new warnings/errors.
3. Manual validation in browser:
- Click search icon opens dialog and clears query.
- Press Ctrl+K on Windows/Linux opens dialog.
- Press Command+K on macOS opens dialog.
- Press unrelated shortcut (e.g., Ctrl+A) does not open dialog.

**Decisions**
- Include: SearchButton keyboard shortcut parity with click behavior, accessibility metadata (`aria-keyshortcuts`), and targeted tests.
- Exclude: broader visual redesign of search trigger and dialog UI changes.
- Reuse existing project shortcut pattern from sidebar components to keep behavior consistent.

**Further Considerations**
1. Decide whether shortcut should open while focus is inside text inputs. Recommendation: keep current global behavior unless product wants to avoid intercepting browser/page conventions in focused inputs.
2. If conflicts occur with app-level command palette shortcuts, centralize shortcut registration in a shared hook later (out of scope for this change).
