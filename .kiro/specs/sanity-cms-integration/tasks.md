# Implementation Plan: Sanity CMS Integration

## Overview

Integrate Sanity CMS into the existing React portfolio site by setting up a Sanity Studio with video, photo, and personal information schemas, configuring the Sanity client in the React app, refactoring FileComponent for dynamic content fetching, and adding environment configuration. Tasks are ordered so each step builds on the previous, ending with full wiring and validation.

## Tasks

- [x] 1. Set up Sanity Studio project structure and configuration
  - [x] 1.1 Create `studio/` directory with `package.json` including `@sanity/orderable-document-list-plugin`, `sanity`, and related dependencies
    - _Requirements: 1.1, 1.3_
  - [x] 1.2 Create `studio/sanity.config.js` that registers the Studio with project ID, dataset, and the `orderableDocumentListDeskItem` plugin for both `videoDocument` and `photoDocument` types
    - _Requirements: 1.1, 1.3, 2.4, 3.2_
  - [x] 1.3 Create `studio/sanity.cli.js` specifying the project ID and dataset
    - _Requirements: 1.2_

- [ ] 2. Define Sanity document schemas
  - [x] 2.1 Create `studio/schemas/videoDocument.js` with fields: `title` (string, required), `videoFile` (file, required), `fileName` (string, required), `youtubeLink` (url, optional), and `orderRankField`
    - Title validation must reject empty strings
    - fileName validation must reject empty strings; this is the display name shown in the file list (e.g., "jobandikas--wakandaForever.mp4")
    - YouTube link uses Sanity's built-in `url` type validation
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [x] 2.2 Create `studio/schemas/photoDocument.js` with fields: `image` (image, required), `caption` (string, optional), and `orderRankField`
    - _Requirements: 3.1_
  - [x] 2.3 Create `studio/schemas/personalInfo.js` as a singleton document with fields: `email` (string, required, email regex validation), `instagramName` (string, optional), `instagramUrl` (url, optional), `youtubeName` (string, optional), `youtubeUrl` (url, optional)
    - _Requirements: 13.1, 13.3, 13.4, 13.5_
  - [x] 2.4 Update `studio/sanity.config.js` to import `personalInfo` schema, add it to `schema.types`, and add a singleton editor entry in the structure builder using a fixed document ID (`personalInfo`)
    - _Requirements: 13.2_
  - [ ]\* 2.5 Write property test for video title validation (Property 1)
    - **Property 1: Video title validation rejects empty/whitespace strings**
    - Generate random whitespace-only strings and verify rejection; generate strings with non-whitespace chars and verify acceptance
    - **Validates: Requirements 2.2**
  - [ ]\* 2.6 Write property test for YouTube link validation (Property 2)
    - **Property 2: YouTube link validation accepts only valid URLs**
    - Generate random valid URLs and invalid strings; verify URL validation accepts/rejects correctly
    - **Validates: Requirements 2.3**
  - [ ]\* 2.7 Write unit tests for schema structure
    - Verify Video_Document, Photo_Document, and Personal_Info_Document schemas have correct field names, types, and validation rules
    - _Requirements: 2.1, 3.1, 13.1_
  - [ ]\* 2.8 Write property test for personal info email validation (Property 8)
    - **Property 8: Personal info email validation accepts only valid email addresses**
    - Generate random strings matching and not matching email patterns; verify email validation accepts/rejects correctly
    - **Validates: Requirements 13.3**

- [x] 3. Checkpoint - Verify Studio setup
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Configure Sanity client and data fetching hook in the React app
  - [x] 4.1 Create `src/sanityClient.js` exporting a configured `@sanity/client` instance using `REACT_APP_SANITY_PROJECT_ID` and `REACT_APP_SANITY_DATASET` env vars, with `useCdn: true` and `apiVersion: "2024-01-01"`
    - _Requirements: 6.1, 6.2, 6.3, 11.1_
  - [x] 4.2 Create `src/hooks/useSanityData.js` custom hook that accepts a GROQ query string, manages `data`, `loading`, and `error` state, and returns `{ data, loading, error }`
    - On fetch success: sets data and loading=false
    - On fetch error: sets error, keeps data as empty array, sets loading=false
    - _Requirements: 6.4, 7.4, 8.4_
  - [ ]\* 4.3 Write unit tests for Sanity client configuration
    - Verify `createClient` is called with correct env vars, `useCdn: true`, and correct API version
    - _Requirements: 6.1, 6.2, 6.3, 11.1_
  - [ ]\* 4.4 Write property test for fetch error graceful degradation (Property 4)
    - **Property 4: Fetch errors result in graceful degradation**
    - Generate random Error objects; verify `useSanityData` returns error state with empty data and `loading: false`, and FileComponent renders without throwing
    - **Validates: Requirements 6.4**

- [ ] 5. Refactor FileComponent for dynamic CMS content
  - [x] 5.1 Modify `src/components/FileComponent.js` to use `useSanityData` hook with GROQ queries for videos (`*[_type == "videoDocument"] | order(orderRank asc)`) and photos (`*[_type == "photoDocument"] | order(orderRank asc)`)
    - Remove hardcoded `videoArray`, `ytArray`, and `imgTotal` references
    - Use `fileName` from CMS data for the file name display in the file list (replacing the hardcoded `videoArray` names)
    - Use `caption` from CMS data for photo entries when available
    - Render loading indicator while `loading` is true
    - Render empty state message when `data` is empty array
    - Render error state message on fetch failure (graceful degradation)
    - Pass CDN URLs to existing `Video` and `Photo` components
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5, 5.3, 5.4_
  - [ ]\* 5.2 Write property test for media ordering (Property 3)
    - **Property 3: Media documents are rendered in orderRank ascending order**
    - Generate random lists of media documents with arbitrary `orderRank` strings; verify rendered order is ascending by `orderRank`
    - **Validates: Requirements 5.3, 5.4**
  - [ ]\* 5.3 Write property test for video document rendering (Property 5)
    - **Property 5: Video document rendering includes all required fields**
    - Generate random lists of video document objects with random titles, fileName values, URLs, and YouTube links; verify all fields appear in rendered output
    - **Validates: Requirements 7.2**
  - [ ]\* 5.4 Write property test for photo document rendering (Property 6)
    - **Property 6: Photo document rendering uses CDN image URLs**
    - Generate random lists of photo document objects with random image URLs; verify each `imageUrl` is used as an img src in rendered output
    - **Validates: Requirements 8.2**
  - [ ]\* 5.5 Write unit tests for FileComponent states
    - Test loading indicator display, empty state messages, video click handler (`playVideo`/`setUrl`), and photo click handler (`showPhoto`/`setUrl`)
    - _Requirements: 7.3, 7.4, 7.5, 8.3, 8.4, 8.5_
  - [x] 5.6 Add personal info fetching using `useSanityData` hook with GROQ query `*[_id == "personalInfo"][0]` to fetch the singleton Personal_Info_Document and pass the data (email, instagramName, instagramUrl, youtubeName, youtubeUrl) to the relevant component for rendering
    - Gracefully handle the case where no Personal_Info_Document exists (render contact section without personal info)
    - _Requirements: 13.6, 13.7_

- [ ] 6. Checkpoint - Verify dynamic content fetching
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Environment configuration and static asset preservation
  - [x] 7.1 Create `.env.example` with `REACT_APP_SANITY_PROJECT_ID` and `REACT_APP_SANITY_DATASET` placeholder values
    - _Requirements: 11.2_
  - [x] 7.2 Update `.gitignore` to include `.env` entry
    - _Requirements: 11.3_
  - [ ]\* 7.3 Write unit tests for environment and static asset preservation
    - Verify `.env.example` contains required variables
    - Verify `.gitignore` contains `.env`
    - Verify `Contact.js`, `IconSection.js`, `LeftSection.js` still reference local `src/assets/` paths and do not import `sanityClient`
    - Verify plugin registration in `sanity.config.js`
    - _Requirements: 9.1, 9.2, 9.3, 11.2, 11.3, 1.3_

- [ ] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Codebase hardening: Security fixes
  - [x] 9.1 Create `src/utils/sanitize.js` with a `sanitizeText` function that escapes HTML special characters, and apply it in `LeftSection.js` `commentHandle` before adding user comments to state
    - _Requirements: 12.2_
  - [x] 9.2 Update `Video.js` `handleYoutube` to validate the YouTube URL hostname before calling `window.open`, rejecting non-YouTube domains
    - _Requirements: 12.4_
  - [x] 9.3 Set `"private": true` in `package.json` to prevent accidental npm publication
    - _Requirements: 12.5_
  - [x] 9.4 Refactor `FileComponent.js` to track active file via React state instead of direct DOM queries (`document.querySelectorAll`, `document.getElementById`), and update `Video.js` exit handler similarly
    - _Requirements: 12.3_

- [ ] 10. Codebase hardening: Performance fixes
  - [x] 10.1 Store the `AudioMotionAnalyzer` instance in `Video.js` and call `destroy()` in the `useEffect` cleanup to prevent memory leaks
    - _Requirements: 12.7_
  - [x] 10.2 Add `loading="lazy"` to photo thumbnail `<img>` elements in `FileComponent.js`
    - _Requirements: 12.6_

- [ ] 11. Codebase hardening: Accessibility fixes
  - [x] 11.1 Replace all `alt="uh oh"` attributes across components with descriptive alt text (e.g., "Video file icon", "Photo thumbnail", "Profile picture for {username}", "Left fingerprint scan")
    - _Requirements: 12.8_
  - [x] 11.2 Add `role="button"`, `tabIndex={0}`, `aria-label`, and `onKeyDown` handlers to clickable file items in `FileComponent.js`
    - _Requirements: 12.9, 12.10_
  - [x] 11.3 Add `aria-label` attributes to icon-only buttons in `Video.js` and `Photo.js` (close, pause/play, YouTube, like, comment)
    - _Requirements: 12.9_

- [ ] 12. Codebase hardening: Code quality fixes
  - [x] 12.1 Create `src/components/ErrorBoundary.js` class component and wrap `<App />` in `src/index.js` with it
    - _Requirements: 12.1_
  - [x] 12.2 Replace loose equality (`==`, `!=`) with strict equality (`===`, `!==`) in `LeftSection.js`
    - _Requirements: 12.11_
  - [x] 12.3 Remove deprecated `e.keyCode` usage in `LeftSection.js`, keeping only `e.key === "Enter"`
    - _Requirements: 12.12_
  - [ ]\* 12.4 Write property test for comment sanitization (Property 7)
    - **Property 7: Comment text sanitization prevents HTML injection**
    - Generate random strings containing HTML tags and script elements; verify sanitizeText escapes all HTML special characters
    - **Validates: Requirements 12.2**

- [ ] 13. Final checkpoint - Verify all hardening changes
  - Ensure all tests pass and no regressions introduced, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests use `fast-check` with Jest (minimum 100 iterations per property)
- Unit tests and property tests are complementary — unit tests cover specific examples/edge cases, property tests verify universal invariants
- The existing `Video.js` and `Photo.js` components require no changes — CDN URLs are drop-in replacements for local file paths
