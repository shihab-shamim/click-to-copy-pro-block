import {
  PanelBody,
  TabPanel,
  ToggleControl,
  SelectControl,
  __experimentalBoxControl as BoxControl,
  __experimentalInputControl as InputControl,
} from "@wordpress/components";
import { HelpPanel, IconLibrary } from "../../../../../../../../bpl-tools/Components";
import { checkForm, themeSwitch } from "../../../../utils/functions";
import options from "../../../../utils/options";
import { __ } from "@wordpress/i18n";
import { BControlPro } from "../../../../../../../../bpl-tools/ProControls";

const Genarel = ({ attributes, setAttributes,premiumProps }) => {
  const { input, elements, forms } = attributes;
  const updateObject = (attr, key, val) => {
    const newAttr = { ...attributes[attr] };
    newAttr[key] = val;
    setAttributes({ [attr]: newAttr });
  };
  return (
   
    <>
    {["default","form1","form2","form3","form4"].includes(forms)?  <>
      <HelpPanel
        slug="click-to-copy"
        docsLink="https://bplugins.com/docs/click-to-copy"
      />
      <PanelBody
        className="bPlPanelBody ctcBPanelBody"
        title={__("Input", "clipboard")}
        initialOpen={false}
      >


        <InputControl
          className="mt10"
          label={__("Content", "clipboard")}
          labelPosition="top"
          value={input?.offerContent}
          onChange={(val) => updateObject("input", "offerContent", val)}
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Elements", "clipboard")}
        initialOpen={false}
      >
        {forms !== "form4" && (
          <>
            <ToggleControl
              className="mt10"
              label={__("Label", "clipboard")}
              checked={elements?.label}
              onChange={(val) => {
                updateObject("elements", "label", val);
              }}
            />

            <ToggleControl
              className="mt10"
              label={__("Icon", "clipboard")}
              checked={elements?.icon}
              onChange={(val) => {
                updateObject("elements", "icon", val);
              }}
            />
          </>
        )}

        <ToggleControl
          className="mt10"
          label={__("Text", "clipboard")}
          checked={elements?.text}
          onChange={(val) => {
            updateObject("elements", "text", val);
          }}
        />
      </PanelBody>
      

      <PanelBody
        className="bPlPanelBody"
        title={__("Select a Themes", "clipboard")}
        initialOpen={false}
      >
        <SelectControl
          label={__("Select Form", "clipboard")}
          labelPosition="side"
          value={forms}
          options={options?.forms}
          onChange={(val) => {
            ["default", "form1", "form2", "form3", "form4"].includes(val) ? setAttributes({ forms: val, ...checkForm(val) }): setAttributes(themeSwitch(val, attributes,));

           
          }}
        />
      </PanelBody>
    </>: <>
      <HelpPanel
        slug="click-to-copy"
        docsLink="https://bplugins.com/docs/click-to-copy"
      />
      <PanelBody
        className="bPlPanelBody ctcBPanelBody"
        title={__("Label", "clipboard")}
        initialOpen={false}
      >


        <BControlPro Component={InputControl}  {...premiumProps}
          className="mt10"
          label={__("Label", "clipboard")}
          labelPosition="top"
          value={input?.label}
          onChange={(val) => updateObject("input", "label", val)}
          
        />
      </PanelBody>
      <PanelBody
        className="bPlPanelBody ctcBPanelBody"
        title={__("Input", "clipboard")}
        initialOpen={false}
      >


        <BControlPro Component={InputControl}  {...premiumProps}
          className="mt10"
          label={__("Content", "clipboard")}
          labelPosition="top"
          value={input?.offerContent}
          onChange={(val) => updateObject("input", "offerContent", val)}
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Elements", "clipboard")}
        initialOpen={false}
      >
     
          
            < BControlPro Component={ToggleControl}  {...premiumProps}
              className="mt10"
              label={__("Label", "clipboard")}
              checked={elements?.label}
              onChange={(val) => {
                updateObject("elements", "label", val);
              }}
            />
               <BControlPro Component={ToggleControl}  {...premiumProps}
              className="mt10"
              label={__(" Symble Icon Show", "clipboard")}
              checked={elements?.symbleIcon}
              onChange={(val) => {
                updateObject("elements", "symbleIcon", val);
              }}
            />

            <BControlPro Component={ToggleControl}  {...premiumProps}
              className="mt10"
              label={__(" Copy Icon Show", "clipboard")}
              checked={elements?.icon}
              onChange={(val) => {
                updateObject("elements", "icon", val);
              }}
            />
              <BControlPro Component={ToggleControl}  {...premiumProps}
              className="mt10"
              label={__(" Input Click To Copy", "clipboard")}
              checked={elements?.inputClickToCopy}
              onChange={(val) => {
                updateObject("elements", "inputClickToCopy", val);
              }}
            />
          
 

   
      </PanelBody>
      

      <PanelBody
        className="bPlPanelBody"
        title={__("Select Forms", "clipboard")}
        initialOpen={false}
      >
        <SelectControl
          label={__("Select a Themes", "clipboard")}
          labelPosition="side"
          value={forms}
          options={options?.forms}
          onChange={(val) => {
            ["default", "form1", "form2", "form3", "form4"].includes(val) ? setAttributes({ forms: val, ...checkForm(val) }): setAttributes(themeSwitch(val, attributes,));

           
          }}
        />
      </PanelBody>
    </>}
    </>
  );
};

export default Genarel;
