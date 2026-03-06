import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import videoDocument from "./schemas/videoDocument";
import photoDocument from "./schemas/photoDocument";
import personalInfo from "./schemas/personalInfo";

export default defineConfig({
  name: "default",
  title: "Portfolio Studio",

  projectId: "zctvx9iv",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({
              type: "videoDocument",
              title: "Videos",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "photoDocument",
              title: "Photos",
              S,
              context,
            }),
            S.listItem()
              .title("Personal Information")
              .child(
                S.document()
                  .schemaType("personalInfo")
                  .documentId("personalInfo"),
              ),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["videoDocument", "photoDocument", "personalInfo"].includes(
                  listItem.getId(),
                ),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [videoDocument, photoDocument, personalInfo],
  },
});
