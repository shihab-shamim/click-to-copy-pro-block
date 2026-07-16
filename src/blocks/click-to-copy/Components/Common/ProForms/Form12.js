const Form12 = ({ attributes, handleCopy, copied,labelElPro, InputElPro,isEditor,isPremium ,handlePricinnNavigate}) => {
  const { input, elements } = attributes;
  const proVersionGenerate=()=>{
    if(isEditor){
      return <button className="proBtn simple" onClick={!isEditor && elements?.inputClickToCopy ? handleCopy : undefined}

>
          {elements?.symbleIcon && <span
            className="proSymbleIcon"
            dangerouslySetInnerHTML={{ __html: input?.icon }}
          ></span>}
          {InputElPro}
       {elements?.icon && <span onClick={handleCopy}  className="proCopyIcon">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              enableBackground="new 0 0 32 32"
            >
              <rect
                x="13"
                y="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="14"
                height="18"
              ></rect>
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
                points="11,23 5,23 5,5 19,5 19,7 "
              ></polyline>
            </svg>
          </span>}
        </button>
    }
  if(!isEditor && !isPremium){
  return (
    <div onClick={handlePricinnNavigate} style={{position:"relative", width:"500px",padding:"10px 20px",cursor:"pointer"}} >
      
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#2f2f33",
          opacity: 0.5,
          zIndex: 50,
        }}
      ></div>

      <span 
        onClick={handlePricinnNavigate} 
        style={{
          fontSize:"16px",
          zIndex:60,
          cursor:"pointer",
          color:"yellow",
          position:"relative"
        }}
      > 
        <span style={{textDecoration:"underline"}}>Upgrade now </span> to unlock this theme
      </span>

      <button 
        style={{marginTop:"10px",  zIndex:10}} 
        className="proBtn simple"
      >
        {elements?.symbleIcon && <span
          className="proSymbleIcon"
          dangerouslySetInnerHTML={{ __html: input?.icon }}
        ></span>}
        {InputElPro}
        {elements?.icon && <span className="proCopyIcon">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            enableBackground="new 0 0 32 32"
          >
            <rect
              x="13"
              y="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="14"
              height="18"
            ></rect>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeMiterlimit="10"
              points="11,23 5,23 5,5 19,5 19,7 "
            ></polyline>
          </svg>
        </span>}
      </button>
    </div>
  );
}

   if(!isEditor && isPremium){
    return <button className="proBtn simple" onClick={!isEditor && elements?.inputClickToCopy ? handleCopy : undefined}

>
          {elements?.symbleIcon && <span
            className="proSymbleIcon"
            dangerouslySetInnerHTML={{ __html: input?.icon }}
          ></span>}
          {InputElPro}
       {elements?.icon && <span onClick={handleCopy}  className="proCopyIcon">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              enableBackground="new 0 0 32 32"
            >
              <rect
                x="13"
                y="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="14"
                height="18"
              ></rect>
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
                points="11,23 5,23 5,5 19,5 19,7 "
              ></polyline>
            </svg>
          </span>}
        </button>
   }
    
  }

  return (
    <div className="proFormWrapper">
      {elements?.label && labelElPro}

      {copied ? (
        <button className="proBtn simple" >
          <span
            className="proSymbleIcon"
            dangerouslySetInnerHTML={{
              __html: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
               <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128
                        c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 
                        393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'/>
             </svg>`,
            }}
          ></span>

          <span className="proInputContent">Copied</span>
        </button>
      ) : (
        proVersionGenerate()
      )}
    </div>
  );
};

export default Form12;
