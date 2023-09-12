import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogPostFields {
    title?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    publishDate?: EntryFieldTypes.Date;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
