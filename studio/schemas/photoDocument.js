import { orderRankField } from "@sanity/orderable-document-list";

export default {
  name: "photoDocument",
  title: "Photo",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption for the photo",
    },
    orderRankField({ type: "photoDocument" }),
  ],
};
