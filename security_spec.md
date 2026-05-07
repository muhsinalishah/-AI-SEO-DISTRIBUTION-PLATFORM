# Security Specification - IBRAHIM ANALYTICAL

## Data Invariants
1. A Project must have a valid `ownerId` matching the creator's UID.
2. Content and Backlinks must belong to a valid Project, and the user must be the owner of that Project.
3. Users can only read and write their own User profile.
4. Indexing requests and Tasks are private to the user who created them.
5. Expired Domains are globally readable (public directory) but only system/admin writable.
6. Immutability: `createdAt`, `ownerId`, and `projectId` (once set) cannot be changed.

## The Dirty Dozen Payloads (Red Team Test Cases)
1. **Identity Spoofing (User Profile)**: User A attempts to update User B's profile.
2. **Project Hijacking**: User A attempts to create a Project with `ownerId` set to User B.
3. **Orphaned Content**: Attempt to create Content without a valid `projectId`.
4. **Cross-Project Write**: User A attempts to add Content to User B's Project.
5. **Ghost Field Injection**: Adding `isVerified: true` to a Content document to bypass platform moderation.
6. **Task Escalation**: User A attempts to view User B's background tasks.
7. **Negative Credits**: Attempt to set `credits` to -999999.
8. **Admin Promotion**: User attempts to add `isAdmin: true` to their own profile.
9. **Status Shortcutting**: Attempt to update a Task status from `queued` to `completed` without the process running.
10. **ID Poisoning**: Creating a project with a 1MB string as the ID.
11. **System Field Tampering**: User attempts to modify `createdAt` to gain early-access status.
12. **PII Leakage**: Authenticated user attempts a blanket list query on `/users` to scrape emails.

## Test Runner (Logic Verification)
All payloads above MUST return `PERMISSION_DENIED`.
Rules will enforce strict key-checking and relational verification using `get()`.
