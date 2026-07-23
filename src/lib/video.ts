export function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
      }
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

    return null;
  } catch {
    return null;
  }
}
