import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";

import { BlockControls, InspectorControls } from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";

import {
  tabController,
  checkForm,
  toolTipPresets,
  themeSwitch,
} from "../../../utils/functions";
import options from "../../../utils/options";
import icons from "../../../utils/icons";
import Genarel from "./Genaral/Genarel";
import Style from "./Style/Style";
import { AboutProModal, ProModal } from "../../../../../../../bpl-tools/ProControls";
import BlockPreview from "./panel/BlockPreview ";
const { generalStyleTabs, pxUnit, emUnit } = options;

const Settings = ({
  attributes,
  setAttributes,
  device,
  isPremium,
  isProModalOpen,
  setIsProModalOpen,
}) => {
  const { btnIcon, forms } = attributes;

  const premiumProps = { isPremium, setIsProModalOpen };

  const props = {
    premiumProps,
  };

  useEffect(() => {
    icons?.iconCopy(btnIcon.size);
    icons?.iconCopy(btnIcon.color);
  }, [btnIcon]);

  return (
    <>
      <InspectorControls>
        <TabPanel
          className="bPlTabPanel"
          activeClass="activeTab"
          tabs={generalStyleTabs}
          onSelect={() => tabController()}
        >
          {(tab) => (
            <>
              {"general" === tab.name && (
                <Genarel
                  attributes={attributes}
                  setAttributes={setAttributes}
                  device={device}
                  {...props}
                />
              )}

              {"style" === tab.name && (
                <Style
                  attributes={attributes}
                  setAttributes={setAttributes}
                  device={device}
                  {...props}
                />
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>
      <BlockControls>
        <BlockPreview
          options={toolTipPresets}
          isPremium={isPremium}
          value={forms}
          onChange={(val) => {
            ["default", "form1", "form2", "form3", "form4"].includes(val)
              ? setAttributes({ forms: val, ...checkForm(val) })
              : setAttributes(themeSwitch(val, attributes));
          }}
        />
      </BlockControls>

      <ProModal
        isProModalOpen={isProModalOpen}
        setIsProModalOpen={setIsProModalOpen}
        link="tools.php?page=click-to-copy-dashboard#/pricing"
      >
        <li>
          <strong>{__("Pro: ", "clipboard")}</strong>
          {__("Everything in free", "clipboard")}
        </li>
        <li>
          <strong>{__("Pro: ", "clipboard")}</strong>
          {__("Custom button colors and styles", "clipboard")}
        </li>
        <li>
          <strong>{__("Pro: ", "clipboard")}</strong>
          {__("Advanced typography and color controls", "clipboard")}
        </li>
        <li>
          <strong>{__("Pro: ", "clipboard")}</strong>
          {__("Padding, margin, border, and shadow customization", "clipboard")}
        </li>
        <li>
          <strong>{__("Pro: ", "clipboard")}</strong>
          {__("Hover effects for inputs and buttons", "clipboard")}
        </li>
        <li>
          <strong>{__("Pro: ", "clipboard")}</strong>
          {__("Icon library integration and size/color controls", "clipboard")}
        </li>
      </ProModal>
    </>
  );
};
export default Settings;
