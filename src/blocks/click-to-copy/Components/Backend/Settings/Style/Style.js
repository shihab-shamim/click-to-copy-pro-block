import {
  PanelBody,
  TabPanel,
  ToggleControl,
  SelectControl,
  // __experimentalBoxControl as BoxControl,
  __experimentalInputControl as InputControl,
  PanelRow,
  BorderBoxControl,
  RangeControl,
} from "@wordpress/components";

import {
  ColorControl,
  Typography,
  ColorsControl,
  HelpPanel,
  Background,
  Label,
  Device,
  BoxControl,
  ShadowControl,
  IconLibrary,
  BButtonGroup,
} from "../../../../../../../../bpl-tools/Components";
// import { BorderControl } from "../../../../../../../bpl-tools/Components/Deprecated";
import { produce } from "immer";
import options from "../../../../utils/options";
import { __ } from "@wordpress/i18n";
import { BorderControl } from "../../../../../../../../bpl-tools/Components/Deprecated";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import icons from "../../../../../../../../bpl-tools/Components/IconControl/icons";
import { BControlPro } from "../../../../../../../../bpl-tools/ProControls";


const Style = ({ setAttributes, attributes ,device,premiumProps}) => {
  const { generalStyleTabs, pxUnit, emUnit } = options;
  const {
    input,
    elements,
    forms,
    labelTypo,
    labelColor,
    inputTypo,
    inputColors,
    inputPadding,
    inputBorder,
    btnTypo,
    btnColors,
    btnBorder,
    btnPadding,
    btnIcon,
    hoverContent,
    styles={}
  } = attributes;
 
  return (
    <>
      {["default", "form1", "form2", "form3", "form4"].includes(
        attributes?.forms
      ) ? (
        <>
          {elements?.label && forms !== "form4" && (
            <PanelBody
              className="bPlPanelBody"
              title={__("Label", "clipboard")}
              initialOpen={false}
            >
              <Typography
                className="mb10"
                label={__("Typography", "clipboard")}
                value={labelTypo}
                onChange={(val) => {
                  setAttributes({ labelTypo: val });
                }}
                produce={produce}
              />

              <ColorControl
                className=""
                label={__("Color", "clipboard")}
                value={labelColor}
                onChange={(val) => setAttributes({ labelColor: val })}
              />
            </PanelBody>
          )}

          <PanelBody
            className="bPlPanelBody"
            title={__("Input", "clipboard")}
            initialOpen={false}
          >
            <Typography
              className="mb10"
              label={__("Typography", "clipboard")}
              value={inputTypo}
              onChange={(val) => {
                setAttributes({ inputTypo: val });
              }}
              produce={produce}
            />

            <ColorsControl
              className="mb20"
              label={__("Colors", "clipboard")}
              value={inputColors}
              onChange={(val) => {
                setAttributes({ inputColors: val });
              }}
            />

            {forms !== "form4" && (
              <>
                <BoxControl
                  label={__("Padding", "clipboard")}
                  values={inputPadding}
                  onChange={(val) => setAttributes({ inputPadding: val })}
                  resetValues={{
                    top: "10px",
                    right: "10px",
                    bottom: "10px",
                    left: "10px",
                  }}
                  units={[pxUnit(3), emUnit(2)]}
                />

                <BorderControl
                  className="mt10"
                  label={__("Border", "clipboard")}
                  value={inputBorder}
                  onChange={(val) => {
                    setAttributes({ inputBorder: val });
                  }}
                />
              </>
            )}
          </PanelBody>

          {forms !== "form4" && (
            <PanelBody
              className="bPlPanelBody"
              title={__("Button", "clipboard")}
              initialOpen={false}
            >
              <Typography
                className="mb10"
                label={__("Typography", "clipboard")}
                value={btnTypo}
                onChange={(val) => {
                  setAttributes({
                    btnTypo: val,
                    btnIcon: { ...btnIcon, size: btnTypo?.fontSize?.desktop },
                  });
                }}
                produce={produce}
              />

              <ColorsControl
                className="mb20"
                label={__("Colors", "clipboard")}
                value={btnColors}
                onChange={(val) => {
                  setAttributes({
                    btnColors: val,
                    btnIcon: { ...btnIcon, color: btnColors?.color },
                  });
                }}
              />

              <BorderControl
                className="mt10 mb10"
                label={__("Border", "clipboard")}
                value={btnBorder}
                onChange={(val) => {
                  setAttributes({ btnBorder: val });
                }}
              />

              <BoxControl
                label={__("Padding", "clipboard")}
                values={btnPadding}
                onChange={(val) => setAttributes({ btnPadding: val })}
                resetValues={{
                  top: "10px",
                  right: "10px",
                  bottom: "10px",
                  left: "10px",
                }}
                units={[pxUnit(3), emUnit(2)]}
              />
            </PanelBody>
          )}

          {forms === "form4" && (
            <PanelBody
              className="bPlPanelBody"
              title={__("Hover content", "clipboard")}
              initialOpen={false}
            >
              <Typography
                className="mb10"
                label={__("Typography", "clipboard")}
                value={hoverContent?.typo}
                onChange={(val) => {
                  setAttributes({
                    hoverContent: { ...hoverContent, typo: val },
                  });
                }}
                produce={produce}
              />

              <ColorsControl
                className="mb20"
                label={__("Colors", "clipboard")}
                value={hoverContent?.colors}
                onChange={(val) => {
                  setAttributes({
                    hoverContent: { ...hoverContent, colors: val },
                  });
                }}
              />
            </PanelBody>
          )}
        </>
      ) : (
        <>
          <PanelBody
            PanelBody
            className="bPlPanelBody"
            title={__("Section", "clipboard")}
             initialOpen={false}
          >
            <BControlPro  label={__("Background", "clipboard")} Component={Background}  {...premiumProps}  value={styles?.bg} onChange={v=>setAttributes({styles:updateData(styles,v,"bg")})} />

              <PanelRow><Label>Padding</Label><Device/></PanelRow>
              <BControlPro Component={BoxControl}  {...premiumProps}  values={styles?.padding[device]} onChange={v=>setAttributes({styles:updateData(styles,v,"padding",device)})} />

                 <PanelRow><Label>Margin</Label><Device/></PanelRow>
              <BControlPro Component={BoxControl}  {...premiumProps}  values={styles?.margin[device]} onChange={v=>setAttributes({styles:updateData(styles,v,"margin",device)})} />



          </PanelBody>
          {elements?.label &&  (
            <PanelBody
              className="bPlPanelBody"
              title={__("Label", "clipboard")}
              initialOpen={false}
            >
              <BControlPro Component={Typography}  {...premiumProps}

                className="mb10"
                label={__("Typography", "clipboard")}
                value={labelTypo}
                onChange={(val) => {
                  setAttributes({ labelTypo: val });
                }}
                produce={produce}
              />

              <BControlPro Component={ColorControl}  {...premiumProps}
                className=""
                label={__("Color", "clipboard")}
                value={labelColor}
                onChange={(val) => setAttributes({ labelColor: val })}
              />
              <BControlPro Component={BoxControl}  {...premiumProps}   label={__("Margin", "clipboard")}
               values={styles?.label?.margin} onChange={v=>setAttributes({styles:updateData(styles,v,"label","margin")})} />
             
            </PanelBody>
          )}

          <PanelBody
            className="bPlPanelBody"
            title={__("Input", "clipboard")}
            initialOpen={false}
          >
            <BControlPro Component={Typography}  {...premiumProps}
              className="mb10"
              label={__("Typography", "clipboard")}
              value={inputTypo}
              onChange={(val) => {
                setAttributes({ inputTypo: val });
              }}
              produce={produce}
            />

            <BControlPro Component={ColorsControl}  {...premiumProps}
              className="mb20"
              label={__("Colors", "clipboard")}
              value={inputColors}
              onChange={(val) => {
                setAttributes({ inputColors: val });
              }}
            />
             {forms === "form15" &&    <BControlPro Component={ColorsControl}  {...premiumProps}
                className=""
                label={__("Hover Color", "clipboard")}
                value={styles?.input?.hoverBg}
                onChange={(val) => setAttributes({ styles:updateData(styles,val,"input","hoverBg") })}
              /> }
            <BControlPro Component={BoxControl}  {...premiumProps}  units={[pxUnit(3), emUnit(2)]}   label={__(" Text Margin", "clipboard")} values={styles?.input?.text?.margin} onChange={v=>setAttributes({styles:updateData(styles,v,"input","text","margin")})} />

             <BControlPro Component={BoxControl}  {...premiumProps}
                  label={__("Margin", "clipboard")}
                  values={styles?.input?.margin}
                  onChange={(v) => setAttributes({ styles:updateData(styles,v,"input","margin") })}
                  resetValues={{
                    top: "10px",
                    right: "10px",
                    bottom: "10px",
                    left: "10px",
                  }}
                  units={[pxUnit(3), emUnit(2)]}
                />
              
                <BControlPro Component={BoxControl}  {...premiumProps}
                  label={__("Padding", "clipboard")}
                  values={inputPadding}
                  onChange={(val) => setAttributes({ inputPadding: val })}
                  resetValues={{
                    top: "10px",
                    right: "10px",
                    bottom: "10px",
                    left: "10px",
                  }}
                  units={[pxUnit(3), emUnit(2)]}
                />
                <BControlPro Component={BoxControl}  {...premiumProps}  label={__("Radius", "clipboard")} values={styles?.input?.radius}  onChange={(val) => {
                    setAttributes({styles:updateData(styles,val,"input","radius")});
                  }}  />

                  <BControlPro  Component={BButtonGroup}  {...premiumProps}  className="mt10" label={__("Alignment", "clipboard")} value={styles?.input?.alignment} options={[
                    {label:"Left",value:"left"},
                    {label:"Center",value:"center"},
                    {label:"Right",value:"right"}

                  ]} 
                  onChange={v=>setAttributes({styles:updateData(styles,v,"input","alignment")})}
                  />

                <BControlPro Component={BorderBoxControl}  {...premiumProps}
                  className="mt10"
                  label={__("Border", "clipboard")}
                  value={styles?.input?.border}
                  onChange={(val) => {
                    setAttributes({styles:updateData(styles,val,"input","border")});
                  }}
                />
                

                   <BControlPro Component={BorderBoxControl}  {...premiumProps}
                  className="mt10"
                  label={__("Hover Border", "clipboard")}
                  value={styles?.input?.hoverBorder}
                  onChange={(val) => {
                    setAttributes({styles:updateData(styles,val,"input","hoverBorder")});
                  }}
                />
                <BControlPro Component={ShadowControl}  {...premiumProps}   className="mt10"
                  label={__("Shadow", "clipboard")}
                  value={styles?.input?.shadow}
                  onChange={v=>setAttributes({styles:updateData(styles,v,"input","shadow")})}
                   />
                     <BControlPro Component={ShadowControl}  {...premiumProps}   className="mt10"
                  label={__("Hover Shadow", "clipboard")}
                  value={styles?.input?.hoverShadow}
                  onChange={v=>setAttributes({styles:updateData(styles,v,"input","hoverShadow")})}
                   />

                   <BControlPro Component={IconLibrary}  {...premiumProps} label={__("Icon", "clipboard")} value={input?.icon} onChange={v=>setAttributes({ input: { ...input, icon: v } })} />


                <BControlPro Component={ColorControl}  {...premiumProps}  className="mt10"
                  label={__("Icon Color", "clipboard")} value={styles?.icon?.color}  onChange={(val) => {
                    setAttributes({styles:updateData(styles,val,"icon","color")});
                  }}  />

                  <BControlPro Component={RangeControl}  {...premiumProps} className="mt10"
                  label={__("Icon Size", "clipboard")} value={styles?.icon?.size}  onChange={(val) => {
                    setAttributes({styles:updateData(styles,val,"icon","size")});
                  }} />
             
           
          </PanelBody>

         

        
        </>
      )}
      
    </>
  );
};

export default Style;
