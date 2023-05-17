import Image from "next/image";
import ReactMarkdown from "react-markdown";

// markdown scheme: ![AltText {priority}{768x432}](/image.jpg)

const MarkDown = ({ content }) => {
  const transformImageUri = (uri) =>
    uri.startsWith("http")
      ? uri
      : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${uri}`;

  const MarkdownComponents = {
    p: (paragraph) => {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const metastring = image.properties.alt;
        const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
        const metaWidth = metastring.match(/{([^}]+)x/);
        const metaHeight = metastring.match(/x([^}]+)}/);
        const width = metaWidth ? metaWidth[1] : "768";
        const height = metaHeight ? metaHeight[1] : "432";
        const isPriority = metastring?.toLowerCase().match("{priority}");
        const hasCaption = metastring?.toLowerCase().includes("{caption:");
        const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

        const imgSrc = transformImageUri(image.properties.src);
        return (
          <div className="postImgWrapper">
            <Image
              src={imgSrc}
              width={width}
              height={height}
              className="postImg"
              alt={alt}
              priority={isPriority}
            />
            {hasCaption ? (
              <div className="caption" aria-label={caption}>
                {caption}
              </div>
            ) : null}
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
  };
  return (
    <ReactMarkdown
      // eslint-disable-next-line react/no-children-prop
      children={content}
      components={MarkdownComponents}
    />
  );
};

export default MarkDown;
