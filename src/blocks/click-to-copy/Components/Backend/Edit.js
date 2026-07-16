import { __ } from '@wordpress/i18n';
import { useEffect, useState, useRef } from '@wordpress/element';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { withSelect } from "@wordpress/data";

import Settings from './Settings/Settings';

import { tabController } from '../../../../../../bpl-tools/utils/functions';
import Style from '../Common/Style';
import Forms from '../../Forms';
import ProForms from '../Common/ProForms/ProForms';
import { BControlPro } from '../../../../../../bpl-tools/ProControls';
import ClipBoard from './ClipBoard';


const Edit = props => {
  const { attributes, setAttributes, clientId, isSelected,device,  currentPostId, CPTType } = props;
 
    const [copied, setCopied] = useState(false);
    const divRef = useRef(null);

    const { forms, input } = attributes;
    const  isPremium  = Boolean(ctcbpipecheck ?? false);
    const [isProModalOpen, setIsProModalOpen] = useState(false);
    const premiumProps = { isPremium, setIsProModalOpen };

     const shortcode = `[ctc id=${currentPostId}]`;
        
   

    useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

    useEffect(() => tabController(), [isSelected]);

    const labelEl = <RichText tagName="div" className='label' value={input?.label} onChange={val => setAttributes({ input: { ...input, label: val } })} placeholder='Title Here' inlineToolbar />

    const InputEl = <RichText tagName="div" ref={divRef} className='text' value={(forms === "form1" && copied) ? __("Copied", "clipboard") : input?.offerContent} onChange={val => setAttributes({ input: { ...input, offerContent: val } })} placeholder='Input your content' />

       const labelElPro = <BControlPro Component={RichText}  {...premiumProps} tagName="div" className='proLabel' value={input?.label} onChange={val => setAttributes({ input: { ...input, label: val } })} placeholder='Title Here' inlineToolbar />

    const InputElPro = <BControlPro Component={RichText}  {...premiumProps} tagName="span" ref={divRef} className='proInputContent' value={ input?.offerContent} onChange={val => setAttributes({ input: { ...input, offerContent: val } })} placeholder='Input your content' />


    const id = `ctcb_click_to_copy_block-${clientId}`;

    const formsProps = {
        attributes,
        setAttributes,
        labelEl,
        InputEl,
        copied,
        setCopied,
        divRef
    }

    return <>
        <Settings attributes={attributes} setAttributes={setAttributes} clientId={clientId} device={device}  isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} isPremium={isPremium} />

        
        <div {...useBlockProps()} id={id}>
            <Style attributes={attributes} EleId={id} />
        {  CPTType === "ctc" && <ClipBoard shortCode={shortcode} />}


            {["default","form1","form2","form3","form4"].includes(attributes?.forms) ? <Forms {...formsProps} /> :<ProForms isEditor={true} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} setAttributes={setAttributes} /> }
           
        </div>
    </>;
};
export default withSelect((select) => {
  const { getDeviceType } = select('core/editor');
   const currentPostId = select('core/editor').getCurrentPostId();
  const CPTType = select('core/editor').getCurrentPostType?.();

  return {
    device: getDeviceType()?.toLowerCase(),
    currentPostId, CPTType
  };
})(Edit);