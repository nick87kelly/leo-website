# Requirements Document

## Introduction

This feature integrates Sanity CMS into an existing React portfolio website that showcases videos and photos for a videographer. Currently, all media assets (23 photos and 11 videos) are hardcoded as static files in the repository under `src/assets/photos/` and `src/assets/videos/`. The integration will allow the portfolio owner to upload, remove, and reorder media through the Sanity Studio portal, while the React frontend fetches and displays content dynamically from Sanity's CDN. Local UI assets (`src/assets/misc/`) and profile pictures (`src/assets/profilePics/`) remain unchanged.

## Glossary

- **Sanity_Studio**: The Sanity CMS web-based content management interface where the portfolio owner manages media content
- **Portfolio_Site**: The existing React frontend application deployed via GitHub Pages at getyourswagup.com
- **Sanity_Client**: The JavaScript client library (`@sanity/client`) used by the Portfolio_Site to query the Sanity Content Lake
- **Content_Lake**: Sanity's hosted backend data store that holds all structured content and media assets
- **GROQ**: Graph-Relational Object Queries, the query language used to fetch data from the Content_Lake
- **Video_Document**: A Sanity document schema representing a single video entry with its file, title, YouTube link, and Order_Rank for drag-and-drop ordering
- **Photo_Document**: A Sanity document schema representing a single photo entry with its image file and Order_Rank for drag-and-drop ordering
- **Media_Asset**: A photo or video file uploaded to the Content_Lake and served via Sanity's CDN
- **FileComponent**: The existing React component (`src/components/FileComponent.js`) responsible for rendering lists of videos and photos
- **Orderable_Document_List**: The `@sanity/orderable-document-list-plugin` for Sanity Studio that provides drag-and-drop reordering of documents and automatically manages an `orderRank` string field on each document
- **Order_Rank**: A string field automatically added to documents by the Orderable_Document_List plugin that determines the sequence in which media items appear on the Portfolio_Site
- **Personal_Info_Document**: A Sanity singleton document schema representing the portfolio owner's personal and social contact information, including email, Instagram, and YouTube details

## Requirements

### Requirement 1: Sanity Project Initialization

**User Story:** As a developer, I want a Sanity project configured within the repository, so that the CMS backend is ready for content management.

#### Acceptance Criteria

1. THE Sanity_Studio SHALL be initialized as a Sanity project within the repository with a dedicated configuration file (`sanity.config.js` or `sanity.config.ts`)
2. THE Sanity_Studio SHALL include a `sanity.cli.js` (or `sanity.cli.ts`) configuration file specifying the project ID and dataset
3. THE Sanity_Studio SHALL include the Orderable_Document_List plugin (`@sanity/orderable-document-list-plugin`) as a dependency and register it in the Studio configuration
4. THE Sanity_Studio SHALL be deployable to Sanity's hosted Studio URL for remote access by the portfolio owner

### Requirement 2: Video Document Schema

**User Story:** As a portfolio owner, I want a structured schema for video entries, so that I can manage video content with all necessary metadata.

#### Acceptance Criteria

1. THE Sanity_Studio SHALL define a Video_Document schema with the following fields: title (string, required), video file (file, required), fileName (string, required), YouTube link (URL, optional), and Order_Rank (string, managed by Orderable_Document_List)
2. THE Sanity_Studio SHALL validate that the Video_Document title field is not empty
3. THE Sanity_Studio SHALL validate that the Video_Document YouTube link field contains a valid URL when provided
4. THE Sanity_Studio SHALL validate that the Video_Document fileName field is not empty
5. THE Sanity_Studio SHALL present Video_Document entries in a drag-and-drop list view provided by the Orderable_Document_List plugin, ordered by Order_Rank ascending

### Requirement 3: Photo Document Schema

**User Story:** As a portfolio owner, I want a structured schema for photo entries, so that I can manage photo content with ordering support.

#### Acceptance Criteria

1. THE Sanity_Studio SHALL define a Photo_Document schema with the following fields: image (image, required), caption (string, optional), and Order_Rank (string, managed by Orderable_Document_List)
2. THE Sanity_Studio SHALL present Photo_Document entries in a drag-and-drop list view provided by the Orderable_Document_List plugin, ordered by Order_Rank ascending

### Requirement 4: Media Upload and Removal

**User Story:** As a portfolio owner, I want to upload new photos and videos and remove existing ones through the CMS, so that I can keep the portfolio up to date without touching code.

#### Acceptance Criteria

1. WHEN the portfolio owner uploads a video file through Sanity_Studio, THE Content_Lake SHALL store the video file and make it accessible via a CDN URL
2. WHEN the portfolio owner uploads an image file through Sanity_Studio, THE Content_Lake SHALL store the image file and make it accessible via a CDN URL
3. WHEN the portfolio owner deletes a Video_Document, THE Content_Lake SHALL remove the Video_Document and its associated Media_Asset
4. WHEN the portfolio owner deletes a Photo_Document, THE Content_Lake SHALL remove the Photo_Document and its associated Media_Asset

### Requirement 5: Media Reordering

**User Story:** As a portfolio owner, I want to control the display order of my photos and videos, so that I can curate how the portfolio is presented.

#### Acceptance Criteria

1. WHEN the portfolio owner drags a Video_Document to a new position in the Orderable_Document_List, THE Sanity_Studio SHALL update the Order_Rank field on the affected Video_Document entries in the Content_Lake
2. WHEN the portfolio owner drags a Photo_Document to a new position in the Orderable_Document_List, THE Sanity_Studio SHALL update the Order_Rank field on the affected Photo_Document entries in the Content_Lake
3. THE Portfolio_Site SHALL display Video_Document entries sorted by Order_Rank in ascending order
4. THE Portfolio_Site SHALL display Photo_Document entries sorted by Order_Rank in ascending order

### Requirement 6: Sanity Client Configuration

**User Story:** As a developer, I want a configured Sanity client in the React app, so that the frontend can fetch content from the CMS.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a Sanity_Client module configured with the project ID, dataset name, and API version
2. THE Sanity_Client SHALL use Sanity's CDN for read operations to optimize load times
3. THE Sanity_Client SHALL store the project ID and dataset name in environment variables rather than hardcoding them in source code
4. IF the Sanity_Client fails to connect to the Content_Lake, THEN THE Portfolio_Site SHALL display the page without media content rather than crashing

### Requirement 7: Dynamic Video Fetching

**User Story:** As a site visitor, I want to see the latest videos from the CMS, so that the portfolio always reflects current content.

#### Acceptance Criteria

1. WHEN the Portfolio_Site loads the Videos tab, THE FileComponent SHALL fetch all published Video_Document entries from the Content_Lake using GROQ
2. THE FileComponent SHALL render each fetched Video_Document with its title, video file URL, YouTube link, and fileName displayed in the file list
3. WHEN a visitor clicks a video entry, THE Portfolio_Site SHALL play the video using the CDN URL from the Content_Lake
4. WHILE Video_Document entries are being fetched, THE FileComponent SHALL display a loading indicator
5. IF the GROQ query returns zero Video_Document entries, THEN THE FileComponent SHALL display an empty state message

### Requirement 8: Dynamic Photo Fetching

**User Story:** As a site visitor, I want to see the latest photos from the CMS, so that the portfolio always reflects current content.

#### Acceptance Criteria

1. WHEN the Portfolio_Site loads the Photos tab, THE FileComponent SHALL fetch all published Photo_Document entries from the Content_Lake using GROQ
2. THE FileComponent SHALL render each fetched Photo_Document as a clickable thumbnail using the CDN image URL, with the caption available for rendering when provided
3. WHEN a visitor clicks a photo entry, THE Portfolio_Site SHALL display the full-size image using the CDN URL from the Content_Lake
4. WHILE Photo_Document entries are being fetched, THE FileComponent SHALL display a loading indicator
5. IF the GROQ query returns zero Photo_Document entries, THEN THE FileComponent SHALL display an empty state message

### Requirement 9: Static Asset Preservation

**User Story:** As a developer, I want to ensure local UI assets and profile pictures remain unchanged, so that the CMS integration does not break existing site functionality.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL continue to load profile pictures from the local `src/assets/profilePics/` directory
2. THE Portfolio_Site SHALL continue to load UI assets (fonts, backgrounds, animations) from the local `src/assets/misc/` directory
3. THE Portfolio_Site SHALL not reference the Content_Lake for any assets in `src/assets/profilePics/` or `src/assets/misc/`

### Requirement 10: GitHub Pages Compatibility

**User Story:** As a developer, I want the CMS integration to work with the existing GitHub Pages deployment, so that the site continues to be hosted without infrastructure changes.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL fetch all CMS content at runtime via client-side API calls to the Content_Lake
2. THE Portfolio_Site SHALL remain deployable using the existing `npm run deploy` command with `gh-pages`
3. THE Portfolio_Site SHALL not require a server-side runtime or build-time data fetching for CMS content

### Requirement 11: Environment Configuration

**User Story:** As a developer, I want environment-based configuration for the Sanity integration, so that credentials are not committed to the repository.

#### Acceptance Criteria

1. THE Portfolio*Site SHALL read Sanity project ID and dataset name from environment variables prefixed with `REACT_APP*`
2. THE Portfolio_Site SHALL include a `.env.example` file documenting the required environment variables
3. THE Portfolio_Site SHALL add `.env` to the `.gitignore` file to prevent credential leakage

### Requirement 12: Codebase Hardening and Quality Improvements

**User Story:** As a developer, I want the existing codebase to follow security, performance, and accessibility best practices, so that the portfolio site is robust, fast, and usable by all visitors.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a React Error Boundary component that catches rendering errors in child components and displays a fallback UI instead of a blank screen
2. THE Portfolio_Site SHALL sanitize user-submitted comment text in the LeftSection component to prevent cross-site scripting (XSS) when rendering comments
3. THE Portfolio_Site SHALL use React refs instead of direct DOM queries (`document.getElementById`, `document.querySelectorAll`) for managing element state in FileComponent and Video components
4. THE Portfolio_Site SHALL validate YouTube URLs in the Video component before opening them via `window.open` to prevent open-redirect attacks
5. THE Portfolio_Site SHALL set `"private": true` in `package.json` to prevent accidental publication to the npm registry
6. WHEN a photo thumbnail is outside the visible viewport, THE Portfolio_Site SHALL defer loading the thumbnail image until the user scrolls near it (lazy loading)
7. THE Portfolio_Site SHALL clean up the `AudioMotionAnalyzer` instance when the Video component unmounts to prevent memory leaks
8. THE Portfolio_Site SHALL provide descriptive `alt` text on all images instead of placeholder text
9. THE Portfolio_Site SHALL add `role` and `aria-label` attributes to interactive elements (video file items, photo file items, and custom buttons) to support screen readers
10. THE Portfolio_Site SHALL use keyboard-accessible elements (buttons or elements with `tabIndex` and `onKeyDown` handlers) for clickable file items in FileComponent
11. THE Portfolio_Site SHALL use strict equality (`===`) instead of loose equality (`==`) in all JavaScript comparisons
12. THE Portfolio_Site SHALL use only `e.key` (not the deprecated `e.keyCode`) for keyboard event handling

### Requirement 13: Personal Information Schema

**User Story:** As a portfolio owner, I want a single editable document in the CMS for my personal contact and social media information, so that I can update my email, Instagram, and YouTube details without touching code.

#### Acceptance Criteria

1. THE Sanity_Studio SHALL define a Personal_Info_Document singleton schema with the following fields: email (string, required), instagramName (string, optional), instagramUrl (URL, optional), youtubeName (string, optional), and youtubeUrl (URL, optional)
2. THE Sanity_Studio SHALL enforce that only one Personal_Info_Document instance exists in the Content_Lake (singleton pattern)
3. THE Sanity_Studio SHALL validate that the Personal_Info_Document email field contains a valid email address
4. THE Sanity_Studio SHALL validate that the Personal_Info_Document instagramUrl field contains a valid URL when provided
5. THE Sanity_Studio SHALL validate that the Personal_Info_Document youtubeUrl field contains a valid URL when provided
6. WHEN the Portfolio_Site loads, THE Sanity_Client SHALL fetch the published Personal_Info_Document from the Content_Lake using GROQ
7. IF no Personal_Info_Document exists in the Content_Lake, THEN THE Portfolio_Site SHALL render the contact section without personal information rather than crashing
