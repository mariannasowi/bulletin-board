export function createPostDate () {
  const postDate = new Date();
  const formattedPostDate = postDate.toDateString();

  // `${postDate.getFullYear()}.${postDate.getMonth.toString().padStart(2, '0')}.${postDate.getDay}`;
  return formattedPostDate;
}