import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ugandhar Vaddi — Portfolio",
    short_name: "Ugandhar",
    description:
      "Associate Data Scientist at Tredence. Building enterprise data intelligence, automated pipelines, and applied machine learning models.",
    start_url: "/",
    display: "standalone",
    background_color: "#10100f",
    theme_color: "#10100f",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
