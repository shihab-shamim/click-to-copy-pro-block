import { useState } from "@wordpress/element";
import { useCopyToClipboard } from "@wordpress/compose";
import "./ClipBoard.scss";

/**
 * Shared shortcode copy widget shown at the top of a block's editor when it is
 * being edited inside the `ctc` ShortCode custom post type. Used by the Pro blocks.
 *
 * Copy is done with WordPress's own `useCopyToClipboard` (clipboard.js under the
 * hood). This is required for the block editor: the canvas is an iframe but block
 * edit code runs in the parent realm, so a hand-rolled
 * navigator.clipboard/document.execCommand approach copies against the wrong
 * document and silently fails. `useCopyToClipboard` handles that correctly.
 */
const ClipBoard = ({ shortCode }) => {
  const [copied, setCopied] = useState(false);

  // Attach the returned ref to the wrapper so a click on the input OR the copy
  // button (both descendants) triggers the copy.
  const copyRef = useCopyToClipboard(shortCode, () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  });

  return (
    <div className="pfbFrontShortCode">
      <div className="pfbFrontShortCodeInner">
        <div className="pfbFrontShortCodeInputWrapper" ref={copyRef}>
          <span className={`tooltip ${copied ? "copied" : ""}`}>
            {copied ? "Copied Successfully!" : "Copy To Clipboard"}
          </span>

          <div className="pfbFrontShortCodeInput">
            <input readOnly value={shortCode} />
          </div>

          <div className="pfbFrontShortCodeCopyBtn">
            {copied ? (
              "✓"
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </div>
        </div>
        <div className="pfbFrontShortCodeHeader">
          <span>Copy the shortcode and use it anywhere.</span>
        </div>
      </div>
    </div>
  );
};

export default ClipBoard;
