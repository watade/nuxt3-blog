import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMarkdownBlogPostFields {
    title: EntryFieldTypes.Symbol;
    body: EntryFieldTypes.Text;
    publishDate: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Symbol;
}

export type TypeMarkdownBlogPostSkeleton = EntrySkeletonType<TypeMarkdownBlogPostFields, "markdownBlogPost">;
export type TypeMarkdownBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMarkdownBlogPostSkeleton, Modifiers, Locales>;
