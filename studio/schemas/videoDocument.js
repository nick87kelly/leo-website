import { orderRankField } from "@sanity/orderable-document-list";

export default {
  name: "videoDocument",
  title: "Video",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "videoFile",
      title: "Video File",
      type: "file",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "fileName",
      title: "File Name",
      type: "string",
      description:
        "Display name shown in the file list (e.g., jobandikas--wakandaForever.mp4)",
      validation: (Rule) => Rule.required(),
    },
    { name: "youtubeLink", title: "YouTube Link", type: "url" },
    orderRankField({ type: "videoDocument" }),
  ],
};
