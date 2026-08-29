# Editorial Review Queue

Active editorial Review state now lives in Supabase/Postgres table `public.miscellany_editorial_reviews`.

- There is exactly one active review per `(user_id, entry_slug)`: a flag plus optional note and selected text.
- Opening an entry from the Review Queue opens that entry with authenticated Review controls enabled.
- Removing a review deletes the active Supabase row.
- Canonical content remains in Markdown/Git under `content/`.
- MemoryEngine is separate and never stores editorial Review notes.

Reviews are temporary editorial TODOs. A review remains active while work remains. Once its requested change has been fully implemented and verified, delete the active Supabase review row. Review history is not currently retained.
