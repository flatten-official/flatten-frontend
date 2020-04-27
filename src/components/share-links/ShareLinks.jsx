import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const url = "www.flatten.ca";
const title =
  "I helped flatten the curve of COVID-19 by filling out a form for an interactive heatmap, check it out here: www.flatten.ca";
const ShareLinks = () => {
  return (
    <div className="share-links-container">
      <FacebookShareButton
        className="sticky-share-buttons"
        url={url}
        quote={title}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton
        className="sticky-share-buttons"
        url={url}
        title={title}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <RedditShareButton
        className="sticky-share-buttons"
        url={url}
        title={title}
      >
        <RedditIcon size={32} round={true} />
      </RedditShareButton>
    </div>
  );
};
export default ShareLinks;
