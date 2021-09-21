export const formatHashtags = (hashtag) => {
  return hashtag
    .split(",")
    .map((tag) =>
      tag.trim().startsWith("#") ? tag : `#${tag.replace(" ", "")}`
    );
};
