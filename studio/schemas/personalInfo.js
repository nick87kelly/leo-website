export default {
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          { name: "email", invert: false },
        ),
    },
    {
      name: "instagramName",
      title: "Instagram Name",
      type: "string",
      description: "Display name for Instagram (e.g., username123)",
    },
    {
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    },
    {
      name: "youtubeName",
      title: "YouTube Name",
      type: "string",
      description: "Display name for YouTube channel",
    },
    {
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    },
  ],
};
