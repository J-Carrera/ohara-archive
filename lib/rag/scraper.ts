import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function extractArticle(url: string) {
  try {
    // Download the webpage
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    // Parse the HTML into a DOM
    const dom = new JSDOM(response.data, {
      url,
    });

    // Extract the main readable article
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    // Readability couldn't find an article
    if (!article) {
      return {
        success: false,
        title: "",
        preview: "",
        text: "",
      };
    }

    // Protect against null values
    const title = article.title ?? "Untitled";

    const rawText = article.textContent ?? "";

    // Clean whitespace
    const cleanedText = rawText
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .trim();

    return {
      success: true,
      title,
      preview: cleanedText.substring(0, 350),
      text: cleanedText,
    };
  } catch (error) {
    console.error("SCRAPER ERROR:", error);

    return {
      success: false,
      title: "",
      preview: "",
      text: "",
    };
  }
}
