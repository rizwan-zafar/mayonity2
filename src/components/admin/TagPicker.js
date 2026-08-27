"use client";

export function TagPicker({ tags, selected }) {
  return (
    <fieldset className="grid gap-2 text-sm">
      <legend>Tags</legend>
      {tags.map((tag) => (
        <label key={tag.id} className="flex items-center gap-2">
          <input type="checkbox" name="tagIds" value={tag.id} defaultChecked={selected.includes(tag.id)} />
          {tag.name}
        </label>
      ))}
    </fieldset>
  );
}
