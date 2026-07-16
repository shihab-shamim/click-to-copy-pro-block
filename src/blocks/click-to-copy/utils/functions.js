  import { produce } from "immer";

  export const getBoxValue = (object) => Object.values(object).join(" ");

  export const tabController = () => {
    setTimeout(() => {
      const panelBodies = document.querySelectorAll(
        ".components-panel__body-title button"
      );
      panelBodies.forEach((item) => {
        item.addEventListener("click", clickEveryItem);
      });

      function clickEveryItem() {
        this.removeEventListener("click", clickEveryItem);
        panelBodies.forEach((item) => {
          if (
            item.getAttribute("aria-expanded") === "true" &&
            !item.isEqualNode(this)
          ) {
            item.click();
          }
        });
        setTimeout(() => {
          this.addEventListener("click", clickEveryItem);
        }, 500);
      }
    }, 500);
  };

  const defaultTheme = {
    labelTypo: { fontSize: 18, fontWeight: 400 },
    labelColor: "#000",
    inputTypo: {
      fontSize: 18,
      fontWeight: 400,
      fontFamily: "Arial, sans-serif",
      lineHeight: "175%",
    },
    inputColors: { color: "#000000a1", bg: "#fff" },
    btnBorder: { width: "0px", style: "solid", color: "#000" },
    btnIcon: { color: "#fff", size: 24 },
    btnTypo: {
      fontSize: 18,
      fontWeight: 400,
      fontFamily: "Arial, sans-serif",
      lineHeight: "135%",
    },
    btnColors: { color: "#fff", bg: "#5784f5" },
  };

  export const checkForm = (val) => {
    if (val === "default") {
      return {
        ...defaultTheme,
        inputPadding: { top: "5px", right: "5px", bottom: "5px", left: "5px" },
        inputBorder: {
          width: "1px",
          style: "solid",
          color: "#000",
          radius: "5px",
        },
        btnPadding: { top: "10px", right: "20px", bottom: "10px", left: "20px" },
        btnBorder: { radius: "10px" },
        elements:{
				"label": true,
				"icon": true,
				"text": true,
				"symbleIcon":true,
				"inputClickToCopy":true
			}
      };
    } else if (val === "form1") {
      return {
        ...defaultTheme,
        inputPadding: { top: "5px", right: "5px", bottom: "5px", left: "5px" },
        inputBorder: {
          width: "1px",
          style: "solid",
          color: "#000",
          radius: "50px",
        },
        btnPadding: { top: "10px", right: "20px", bottom: "10px", left: "20px" },
        btnBorder: { radius: "50px" },
         elements:{
				"label": true,
				"icon": true,
				"text": true,
				"symbleIcon":true,
				"inputClickToCopy":true
			}
      };
    } else if (val === "form2") {
      return {
        ...defaultTheme,
        inputColors: { color: "#000000a1", bg: "#fff" },
        inputPadding: {
          top: "10px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        },
        inputBorder: {
          width: "0px",
          style: "solid",
          color: "#000",
          radius: "5px",
        },
        btnPadding: { top: "10px", right: "20px", bottom: "10px", left: "20px" },
        btnBorder: { radius: "5px" },
         elements:{
				"label": true,
				"icon": true,
				"text": true,
				"symbleIcon":true,
				"inputClickToCopy":true
			}
      };
    } else if (val === "form3") {
      return {
        ...defaultTheme,
        inputPadding: { top: "7px", right: "10px", bottom: "7px", left: "10px" },
        inputBorder: {
          width: "1px",
          style: "solid",
          color: "#000",
          radius: "10px",
        },
        btnPadding: { top: "8px", right: "70px", bottom: "8px", left: "70px" },
        btnBorder: { radius: "10px" },
         elements:{
				"label": true,
				"icon": true,
				"text": true,
				"symbleIcon":true,
				"inputClickToCopy":true
			}
      };
    }
  };

  export const themeSwitch = (forms = "default", attributes) =>
    produce(attributes, (draft) => {
      draft["forms"] = forms;
      switch (forms) {
        case "form5":
          draft["elements"]["label"] = false;
          draft["inputColors"] = {
            color: "#fff",
            bg: "#3b82f6",
          };
          draft["input"]["icon"] =
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z'/></svg>";
          draft["inputPadding"] = {
            top: "10px",
            right: "16px",
            bottom: "10px",
            left: "16px",
          };
          draft["styles"]["input"]["border"] = {};
          draft["styles"]["input"]["hoverBorder"] = {};
          draft["styles"]["bg"] = {};
          draft["styles"]["icon"] = {
            color: "#fff",
            size: 24,
          };
          draft["styles"]["input"]["radius"] = {
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
          };
              draft["styles"]["input"]["hoverShadow"] = [];
                      draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {};

          break;
        case "form6":
            draft["elements"]["label"] = false;
          draft["input"]["icon"] =
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='globe'><path d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z'/></svg>";
          draft["styles"]["input"]["border"] = {
            style: "solid",
            width: "2px",
            color: "#e5e7eb",
          };
          draft["inputColors"] = {
            color: "#000000",
            bg: "#fff",
          };
          draft["styles"]["icon"] = {
            color: "#000000",
            size: 24,
          };
          draft["inputPadding"] = {
            top: "12px",
            right: "12px",
            bottom: "12px",
            left: "12px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "12px",
            left: "12px",
            right: "12px",
            bottom: "12px",
          };
          draft["styles"]["input"]["hoverBorder"] = {
            style: "solid",
            width: "2px",
            color: "#60a5fa",
          };
          draft["styles"]["input"]["hoverShadow"] = [
            {
              hOffset: "0px",
              vOffset: "2px",
              blur: "6px",
              spreed: "0px",
              color: "rgba(0,0,0,0.1)",
              isInset: false,
            },
          ];
                  draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {};



          break;
          case"form7":
            draft["elements"]["label"] = false;
      //     .code {background:#111827;color:#10b981;padding:8px 12px;border-radius:8px;font-family:monospace;font-size:0.85rem;}
      // .code:hover {background:#1f2937;}
      draft["input"]["icon"] =
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='code'><path d='M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8z'/></svg>";
          draft["styles"]["input"]["border"] = {};
          draft["inputColors"] = {
            color: "#10b981",
            bg: "#111827",
          };
          draft["styles"]["icon"] = {
            color: "#10b981",
            size: 24,
          };
          draft["inputPadding"] = {
            top: "12px",
            right: "12px",
            bottom: "12px",
            left: "12px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "12px",
            left: "12px",
            right: "12px",
            bottom: "12px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [];
                  draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {};

          break;

          case"form8":
            draft["elements"]["label"] = false;
      //         .pill {background:#ede9fe;color:#6d28d9;padding:10px 20px;border-radius:9999px;}
      // .pill:hover {background:#ddd6fe;transform:scale(1.05);}
          draft["input"]["icon"] ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='hash'><path d='M8.39 12.648a1 1 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1 1 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.51.51 0 0 0-.523-.516.54.54 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532s.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531s.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z'/></svg>";
          draft["styles"]["input"]["border"] = {};
          draft["inputColors"] = {
            color: "#6d28d9",
            bg: "#ede9fe",
          };
          draft["styles"]["icon"] = {
            color: "#6d28d9",
            size: 24,
          };
          draft["inputPadding"] = {
            top: "10px",
            right: "20px",
            bottom: "10px",
            left: "20px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "9999px",
            left: "9999px",
            right: "9999px",
            bottom: "9999px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [];
                  draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {};

      
          break;
          case"form9":
      //       .gradient {background:linear-gradient(to right,#ec4899,#f97316);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);}
      // .gradient:hover {background:linear-gradient(to right,#db2777,#ea580c);box-shadow:0 6px 12px rgba(0,0,0,0.15);}
        draft["elements"]["label"] = false;
          draft["input"]["icon"] ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='gift'><path d='M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zM1 4v2h6V4zm8 0v2h6V4zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5z'/></svg>";
          draft["styles"]["input"]["border"] = {};
          draft["inputColors"] = {
            color: "#fff",
            bg: "linear-gradient(to right,#ec4899,#f97316)",
          };
          draft["styles"]["icon"] = {
            color: "#fff",
            size: 24,
          };
          draft["inputPadding"] = {
            top: "12px",
            right: "20px",
            bottom: "12px",
            left: "20px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [];
                  draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {};


          break
          case"form10":
      //         .outlined {border:2px solid #3b82f6;color:#3b82f6;padding:8px 16px;border-radius:8px;}
      // .outlined:hover {background:#3b82f6;color:white;}
      // "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-key\"><circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\"></circle><path d=\"M21 2 11.4 11.6\"></path><path d=\"m15.5 7.5 3 3L22 7l-3-3\"></path></svg>"

      draft["elements"]["label"] = false;
          draft["input"]["icon"] ="<svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-key\"><circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\"></circle><path d=\"M21 2 11.4 11.6\"></path><path d=\"m15.5 7.5 3 3L22 7l-3-3\"></path></svg>";
          draft["styles"]["input"]["border"] = {style: "solid",
            width: "2px",
            color: "#3b82f6"};
          draft["inputColors"] = {
            color: "#3b82f6",
            bg: "",
          };
          draft["styles"]["icon"] = {
            color: "#3b82f6",
            size: 24,
          };
          draft["inputPadding"] = {
            top: "8px",
            right: "16px",
            bottom: "8px",
            left: "16px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [];
                  draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {};



          break
          case 'form11':
      //           .badge {background:#10b981;color:white;padding:4px 10px;border-radius:9999px;font-size:0.75rem;font-weight:600;}
      // .badge:hover {background:#059669;transform:scale(1.05);
      draft["elements"]["label"] = false;
          draft["input"]["icon"] ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='star'><path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z'/></svg>";
          draft["styles"]["input"]["border"] = {};
          draft["inputColors"] = {
            color: "#fff",
            bg: "#10b981",
          };
          draft["styles"]["icon"] = {
            color: "#fff",
            size: 20,
          };
          draft["inputPadding"] = {
            top: "4px",
            right: "10px",
            bottom: "4px",
            left: "10px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "9999px",
            left: "9999px",
            right: "9999px",
            bottom: "9999px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [];
                  draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {};

            break;
            case 'form12':
    //  .neon {background:#000;color:#22d3ee;border:1px solid #22d3ee;padding:10px 16px;border-radius:8px;}
    //   .neon:hover {box-shadow:0 0 12px #22d3ee;color:#67e8f9;}
      draft["elements"]["label"] = false;
          draft["input"]["icon"] ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z'/></svg>";
        draft["styles"]["input"]["border"] = {style: "solid",
            width: "2px",
            color: "#22d3ee"};
          draft["inputColors"] = {
            color: "#22d3ee",
            bg: "#000",
          };
          draft["styles"]["icon"] = {
            color: "#22d3ee",
            size: 20,
          };
          draft["inputPadding"] = {
            top: "10px",
            right: "16px",
            bottom: "10px",
            left: "16px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [
    {
      hOffset: "0px",
      vOffset: "0px",
      blur: "12px",
      spread: "0px",
      color: "#22d3ee",
      isInset: false,
    }
  ]
  ;
          draft["styles"]["input"]["hoverBg"] = {};

          draft["styles"]["input"]["shadow"] = [];
            break;
            case "form13":
      
              draft["elements"]["label"] = false;
          draft["input"]["icon"] ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg>";
          draft["styles"]["input"]["border"] = {};
          draft["inputColors"] = {
            color: "#fff",
            bg: "#ef4444",
          };
          draft["styles"]["icon"] = {
            color: "#fff",
            size: 20,
          };
          draft["inputPadding"] = {
            top: "12px",
            right: "16px",
            bottom: "12px",
            left: "16px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [
    {
      hOffset: "0px",
      vOffset: "3px",
      blur: "0px",
      spread: "0px",
      color: "#b91c1c",
      isInset: false,
    }
  ]
  ;
          draft["styles"]["input"]["shadow"] = [
    {
      hOffset: "0px",
      vOffset: "6px",
      blur: "0px",
      spread: "0px",
      color: "#b91c1c",
      isInset: false,
    }
  ]
  ;
          draft["styles"]["input"]["hoverBg"] = {};

              break

              case "form14":
      //             .retro {background:#facc15;color:black;padding:10px 16px;border:4px solid black;font-weight:bold;box-shadow:4px 4px 0 black;}
      // .retro:hover {box-shadow:2px 2px 0 black;}
      
              draft["elements"]["label"] = false;
          draft["input"]["icon"] ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path d='M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z'/></svg>";
          draft["styles"]["input"]["border"] = {style: "solid",
            width: "4px",
            color: "#000"};
          draft["inputColors"] = {
            color: "#000",
            bg: "#facc15",
          };
          draft["styles"]["icon"] = {
            color: "#000",
            size: 20,
          };
          draft["inputPadding"] = {
            top: "10px",
            right: "16px",
            bottom: "10px",
            left: "16px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "4px",
            left: "4px",
            right: "4px",
            bottom: "4px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [
  {
    hOffset: "2px",
    vOffset: "2px",
    blur: "0px",
    spread: "0px",
    color: "black",
    isInset: false,
  }

  ]
  ;
          draft["styles"]["input"]["shadow"] = [
    {
    hOffset: "4px",
    vOffset: "4px",
    blur: "0px",
    spread: "0px",
    color: "black",
    isInset: false,
  }

  ]
  ;
          draft["styles"]["input"]["hoverBg"] = {};


                break;
                case "form15":
      //             .animated {position:relative;background:white;color:#1f2937;padding:12px 16px;border-radius:8px;overflow:hidden;border:2px solid transparent;}
      // .animated::before {content:"";position:absolute;inset:0;background:linear-gradient(to right,#8b5cf6,#ec4899);opacity:0;transition:0.3s;border-radius:8px;z-index:0;}
      // .animated:hover::before {opacity:1;}
      // .animated span {position:relative;z-index:1;}
                  
                  draft["elements"]["label"] = false;
          draft["input"]["icon"] ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='shield'><path d='M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56'/></svg>";
          draft["styles"]["input"]["border"] =  {style: "solid",
            width: "2px",
            color: "transparent"};
          draft["inputColors"] = {
            color: "#1f2937",
            bg: "#fff",
          };
          draft["styles"]["icon"] = {
            color: "#1f2937",
            size: 20,
          };
          draft["inputPadding"] = {
            top: "12px",
            right: "16px",
            bottom: "12px",
            left: "16px",
          };
          draft["styles"]["input"]["radius"] = {
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
          };
          draft["styles"]["input"]["hoverBorder"] = { };
          draft["styles"]["input"]["hoverShadow"] = [];
          draft["styles"]["input"]["shadow"] = [];
          draft["styles"]["input"]["hoverBg"] = {color: "#fff",
            bg: "linear-gradient(to right,#8b5cf6,#ec4899)", type:"gradient"};
            
                  break



        
      }
    });
  export const defaulStyle={
          "bg":{},
          "padding":{
            "desktop":{
              "top":"0px",
              "left":"0px",
              "right":"0px",
              "bottom":"0px"
            },
              "tablet":{
              "top":"0px",
              "left":"0px",
              "right":"0px",
              "bottom":"0px"
            },	"mobile":{
              "top":"0px",
              "left":"0px",
              "right":"0px",
              "bottom":"0px"
            }
          },
          "margin":{
            "desktop":{
              "top":"0px",
              "left":"0px",
              "right":"0px",
              "bottom":"0px"
            },
              "tablet":{
              "top":"0px",
              "left":"0px",
              "right":"0px",
              "bottom":"0px"
            },	"mobile":{
              "top":"0px",
              "left":"0px",
              "right":"0px",
              "bottom":"0px"
            }
          },
          "icon":{
            "color":"#fff",
            "size":16
          },
          "input":{
            "border":{},
            "hoverBorder":{},
                  "hoverBg":{}
            ,
            "radius":{
              "top":"8px",
              "left":"8px",
              "right":"8px",
              "bottom":"8px"
            },
            "hoverShadow":[],
            "shadow":[],
            "text":{
              "margin":{"top":"0px",
              "left":"0px",
              "right":"0px",
              "bottom":"0px"}
            },"margin":{
              "top":"10px",
              "left":"10px",
              "right":"10px",
              "bottom":"10px"

            }

          },
          "label":{
            "margin":{
              "top":"10px",
              "left":"10px",
              "right":"10px",
              "bottom":"10px"

            }
          }


        }


         export const toolTipPresets = [
    {
      label: "Default",
      value: "default",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopydefault.png",
      height: "auto",
      width: "160px",
      isPro:false
    },
    {
      label: "Theme-1",
      value: "form1",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme1.png",
      height: "auto",
      width: "160px",
      isPro:false
    },
    {
      label: "Theme-2",
      value: "form2",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme2.png",
      height: "auto",
      width: "160px",
      isPro:false
    },
    {
      label: "Theme-3",
      value: "form3",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme3.png",
      height: "auto",
      width: "160px",
      isPro:false
    },
    {
      label: "Theme-4",
      value: "form4",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme4.png",
      height: "auto",
      width: "160px",
      isPro:false
    },
    {
      label: "Theme-5",
      value: "form5",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme5.png",
      height: "auto",
      width: "160px",
      isPro:true
      
    },
    {
      label: "Theme-6",
      value: "form6",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme6.png",
      height: "auto",
      width: "160px",
      isPro:true
      
    }
    ,
    {
      label: "Theme-7",
      value: "form7",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme7.png",
      height: "auto",
      width: "160px",
      isPro:true
      
    }   ,
    {
      label: "Theme-8",
      value: "form8",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme8.png",
      height: "auto",
      width: "160px",
      isPro:true
      
    }   ,
    {
      label: "Theme-9",
      value: "form9",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme9.png",
      height: "auto",
      width: "160px",
      isPro:true
      
    }
       ,
    {
      label: "Theme-10",
      value: "form10",
      img: "https://templates.bplugins.com/wp-content/uploads/2025/09/clicktocopytheme10.png",
      height: "auto",
      width: "160px",
      isPro:true
      
    }   
    
  ];
  