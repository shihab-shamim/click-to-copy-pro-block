import { useState } from "react";
import Form5 from "./Form5";
import Form6 from "./Form6";
import Form7 from "./Form7";
import Form8 from "./Form8";
import Form9 from "./Form9";
import Form10 from "./Form10";
import Form11 from "./Form11";
import Form12 from "./Form12";
import Form13 from "./Form13";
import Form14 from "./Form14";
import Form15 from "./Form15";

const ProForms = ({ attributes,labelElPro, InputElPro ,isEditor,pipeCheck}) => {
  const { input ,forms} = attributes;
  const [copied, setCopied] = useState(false);


 
  const handleCopy = () => {
    const text = input?.offerContent || "";

    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Modern API
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // 2 sec reset
        })
        .catch((err) => {
          console.error("Clipboard copy failed:", err);
        });
    } else {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; 
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textarea);
    }
  };
   const handlePricinnNavigate = () => {
    // window.location.href = "/wp-admin/admin.php?page=click-to-copy-dashboard#/pricing";
         window.open(
                                '/wp-admin/tools.php?page=click-to-copy-dashboard#/pricing',
                                '_blank',
                                'noopener,noreferrer'
                            );
  };
  const   isPremium = pipeCheck;
  
 

  return (
    <div className="proFormMainWapper">
       {forms==="form5" && <Form5 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied}   />}
       {forms==="form6" && <Form6 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form7" && <Form7 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form8" && <Form8 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form9" && <Form9 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form10" && <Form10 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form11" && <Form11 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form12" && <Form12 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form13" && <Form13 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form14" && <Form14 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}
       {forms==="form15" && <Form15 handlePricinnNavigate={handlePricinnNavigate}  isPremium={isPremium} isEditor={isEditor} labelElPro={labelElPro} InputElPro={InputElPro} attributes={attributes} handleCopy={handleCopy} copied={copied} />}

     
    </div>
  );
};

export default ProForms;
