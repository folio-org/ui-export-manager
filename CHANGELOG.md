# Change history for ui-export-manager

## (IN PROGRESS)

* Update HTML Page Title on Export Manager Tabs Page. Refs UIEXPMGR-105.
* Update logic related to download files. Refs UIEXPMGR-106.
* React v19: refactor away from default props for functional components. Refs UIEXPMGR-108.
* Download refactoring to support /download endpoint (Bursar). Refs UIEXPMGR-66.
* Permissions cleanup for  Instance records. Refs UIEXPMGR-109.
* Sort logs by Description and Source. Refs UIEXPMGR-110.

## [3.1.0](https://github.com/folio-org/ui-export-manager/tree/v3.1.0) (2024-03-19)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v3.0.0...v3.1.0)

* Export manager - Add accessibility testing to automated tests. Refs UIEXPMGR-101.
* Screen refreshes every time user clicks links. Refs UIEXPMGR-102.

## [3.0.0](https://github.com/folio-org/ui-export-manager/tree/v3.0.0) (2023-10-12)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.4.3...v3.0.0)

* Add EDIFACT orders export to job type filter in Export manager. Refs UIEXPMGR-62.
* Sorting EDI export jobs by export method. Refs UIEXPMGR-81.
* Landing page displays export jobs before any filter is selected. Refs UIEXPMGR-82.
* Missing permission, can't export "update authority headings" report. Refs UIEXPMGR-87.
* Grammatical error in export job. Refs UIEXPMGR-89.
* Export Manager downloads extra file. Refs UIEXPMGR-90.
* *BREAKING* Update `react` to `v18`. Refs UIEXPMGR-93
* Refactor permissions to display link to download bulk-edit upload files. Refs UIEXPMGR-91.
* Update Node.js to v18 in GitHub Actions. Refs UIEXPMGR-94.
* *BREAKING* bump `react-intl` to `v6.4.4`. Refs UIEXPMGR-95.
* Support `data-export-spring` interface `v2.0`. Refs UXPROD-3903.

## [2.4.3](https://github.com/folio-org/ui-export-manager/tree/v2.4.3) (2023-03-20)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.4.2...v2.4.3)

* A hyperlink on the "JobID" column is not clickable with Users In app permissions. Refs UIEXPMGR-83.

## [2.4.2](https://github.com/folio-org/ui-export-manager/tree/v2.4.2) (2023-03-16)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.4.1...v2.4.2)

* Export Manager app | Authority control updates. Refs UIEXPMGR-68.

## [2.4.1](https://github.com/folio-org/ui-export-manager/tree/v2.4.1) (2023-03-10)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.4.0...v2.4.1)

* Provide filename when download EDIFACT export job. Refs UIEXPMGR-80.

## [2.4.0](https://github.com/folio-org/ui-export-manager/tree/v2.4.0) (2023-02-22)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.3.1...v2.4.0)

* Run Accessibility Checker and Color Contrast Analyzer tools. Refs UIEXPMGR-71.
* bump stripes to 8.0.0 for Orchid/2023-R1. Refs UIEXPMGR-72.
* Export Manager app | Authority control updates. Refs UIEXPMGR-68.
* Download refactoring to support /download endpoint (Circulation log). Refs UIEXPMGR-65.
* Missing translation: exportJob.type.BULK_EDIT_IDENTIFIERS. Refs UIEXPMGR-73.
* Support for downloading AUTH_HEADINGS_UPDATES and FAILED_LINKED_BIB_UPDATES job types. Refs UIEXPMGR-78.

## [2.3.1](https://github.com/folio-org/ui-export-manager/tree/v2.3.1) (2022-12-12)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.3.0...v2.3.1)

* Cannot re-run 1 day+ old holdings exports. Refs UIEXPMGR-64.

## [2.3.0](https://github.com/folio-org/ui-export-manager/tree/v2.3.0) (2022-10-28)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.2.3...v2.3.0)

* Remove "eHoldings" under Job type filter. Refs UIEXPMGR-57.
* Export Manager | Results List | Hyperlink one column to improve accessibility. Refs UIEXPMGR-59.
* Two files are generated in the Export Manager clicking on the link with Bulk Edit Errors only. Fix UIEXPMGR-56.
* Export manager - Implement MCL Next/Previous pagination. Refs UIEXPMGR-54.
* Third pane view: Download and re-send actions. Refs UIEXPMGR-60.
* Upgrade Users interface to 16.0. Refs UIEXPMGR-50.
* Filter bulk edit jobs in Export Manager. Refs UIEXPMGR-61

## [2.2.3](https://github.com/folio-org/ui-export-manager/tree/v2.2.3) (2022-09-05)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.2.2...v2.2.3)
* Remove "eHoldings" under Job type filter. Refs UIEXPMGR-57.

## [2.2.2](https://github.com/folio-org/ui-export-manager/tree/v2.2.2) (2022-08-11)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.2.1...v2.2.2)
* The link is enabled in Export Manager without required permissions. Fix UIEXPMGR-52.

## [2.2.1](https://github.com/folio-org/ui-export-manager/tree/v2.2.1) (2022-07-22)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.2.0...v2.2.1)
* Remove react-hot-loader from package.json. Refs UIEXPMGR-33.
* replace babel-eslint with @babel/eslint-parser. Refs UIEXPMGR-41.

## [2.2.0](https://github.com/folio-org/ui-export-manager/tree/v2.2.0) (2022-07-08)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.1.2...v2.2.0)
* Select filter should announce the number of Results in the Results List pane header. Refs UIEXPMGR-31.
* Disable link user data in Export Manager based on permissions. Refs UIEXPMGR-43.
* Update Export Manager app to show eholdings exports. Refs UIEXPMGR-42.
* Missing permission to download exported "Package/Resource" from "Export manager" app. Refs UIEXPMGR-46.

## [2.1.2](https://github.com/folio-org/ui-export-manager/tree/v2.1.2) (2022-04-12)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.1.1...v2.1.2)

* Update permissions. Refs UIEXPMGR-39.

## [2.1.1](https://github.com/folio-org/ui-export-manager/tree/v2.1.1) (2022-04-08)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.1.0...v2.1.1)

* Search and filter organization export logs NOT working. Refs UIEXPMGR-36.

## [2.1.0](https://github.com/folio-org/ui-export-manager/tree/v2.1.0) (2022-03-04)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v2.0.0...v2.1.0)

* Search and filter organization exports logs. Refs UIEXPMGR-26.
* Third pane view - Search and filter organization exports logs. Refs UIEXPMGR-25.
* Third pane view - Rerun action. Refs UIEXPMGR-27.
* Add Sent to and File name to export job details. Refs UIEXPMGR-30.

## [2.0.0](https://github.com/folio-org/ui-export-manager/tree/v2.0.0) (2021-10-07)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v1.1.1...v2.0.0)

* Compile Translation Files into AST Format. Refs UIEXPMGR-13.
* Increment stripes to v7. Refs UIEXPMGR-17.

## [1.1.1](https://github.com/folio-org/ui-export-manager/tree/v1.1.1) (2021-07-28)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v1.1.0...v1.1.1)

* Pin @folio/stripes-acq-components version.

## [1.1.0](https://github.com/folio-org/ui-export-manager/tree/v1.1.0) (2021-06-17)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v1.0.1...v1.1.0)

* Translation updates.

## [1.0.1](https://github.com/folio-org/ui-export-manager/tree/v1.0.1) (2021-04-08)
[Full Changelog](https://github.com/folio-org/ui-export-manager/compare/v1.0.0...v1.0.1)

* Unable to filter results by Source. Refs UIEXPMGR-11.

## [1.0.0](https://github.com/folio-org/ui-export-manager/tree/v1.0.0) (2021-03-19)

* Project Setup: ui-export-manager. Refs UIEXPMGR-1.
* Export manager layout. Refs UIEXPMGR-2.
* Export manager - export jobs view (results). Refs UIEXPMGR-3.
* Export manager - export job details. Refs UIEXPMGR-5.
* Export manager - export jobs search and filters. Refs UIEXPMGR-4.
* Show export job real data. Refs UIEXPMGR-10.
