import { useBlockProps } from "@wordpress/block-editor";
import { withSelect } from "@wordpress/data";

import Settings from "./Settings/Settings";
import Style from "../Common/Style";
import OneCard from "../Common/ring/OneCard";
import RichTextComponents from "./richtext/RichTextComponents";
import ClipBoard from "../../../../components/ClipBoard";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, currentPostId, CPTType } = props;

  return (
    <>
      <Settings {...{ attributes, setAttributes }} />

      <div {...useBlockProps({ id: `block-${clientId}` })}>
        <Style attributes={attributes} id={`block-${clientId}`} />

        { CPTType === "ctc" && <ClipBoard shortCode={`[ctc id=${currentPostId}]`} /> }

        <OneCard attributes={attributes} RichTextComponents={RichTextComponents} setAttributes={setAttributes} />
      </div>
    </>
  );
};
export default withSelect((select) => {
  const editor = select("core/editor");
  return {
    currentPostId: editor?.getCurrentPostId?.(),
    CPTType: editor?.getCurrentPostType?.(),
  };
})(Edit);
