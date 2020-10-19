# Code review by Boris Melikian.

- code formatting: Explicitly set types for parameters.
- code formatting: Use array and object destructuring where possible.
- code formatting: Use shorthand properties for arrow function return where possible.
- UI improvement: Implement lazy loading of book titles.
- good practice: CSS classes naming convention, replace \-- to \-. No need to have double dash there.
- good practice: use prettier --write upon commit.
- good practice: Optimize imports from another classes (i.e. don't user * import)
- documentation and code comments: Document the code, functions and classes etc.
- unit test: Fixed unit tests for failedRemoveFromReadingList and failedAddToReadingList.
- other: VS code experience there is sometimes new file debug.log appears in working directory, not sure where it comes from, but it can be added to .gitignore as well.
- packages : Update package with npm update (If we run npm audit it reports packages that can be updated and fixed, and if we run npm update and then npm run lint there would be new warnings coming from new eslint 12 version.)
- packages: Audit packages with npm audit and try to fix as much as possible (probably patches or updates available).
- security audit: Could use Snyk.io wizard or other tools to check packages against known vulnerabilities.
- accessibility: automatic test and fixes with browser extensions.
- accessibility: manull full test and fixes with browser extensions.
