(function () {
  const widgetId = document.currentScript.getAttribute("widget-id");
  const sourceUrl = document.currentScript.src;
  const { origin } = new URL(sourceUrl);
  const serverUrl = origin;

  function createWidget(settings) {
    // Load Google Font Poppins dynamically
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Create scoped styles for the widget
    const widgetStyle = document.createElement("style");
    widgetStyle.innerHTML = `
      #chat-container, #custom-widget-button, #chat-container * {
        font-family: 'Poppins', sans-serif !important;
      }
    `;
    document.head.appendChild(widgetStyle);

    // Determine position
    const isBottomLeft = settings.position === "bottom-left";
    const marginSide = isBottomLeft ? "left" : "right";
    // Create the chat button
    const widgetButton = document.createElement("button");
    widgetButton.id = "custom-widget-button";
    widgetButton.style.position = "fixed";
    widgetButton.style.bottom = `${settings.marginbottom}px` || "30px";
    widgetButton.style[marginSide] =
      settings[`margin${marginSide}px`] || "30px";
    widgetButton.style.padding = "10px 15px";
    widgetButton.style.backgroundColor =
      settings.buttonBackgroundColor || "#000";
    widgetButton.style.borderRadius = `${settings.borderRadius}px` || "24px";
    widgetButton.style.border = "none";
    widgetButton.style.color = "#fff";
    widgetButton.style.fontSize = "14px";
    widgetButton.style.cursor = "pointer";
    widgetButton.style.display = "flex";
    widgetButton.style.alignItems = "center";
    widgetButton.style.justifyContent = "center";
    widgetButton.style.transition = "all 0s ease-in-out";
    widgetButton.style.zIndex = "999999";
    // Create the SVG element dynamically
    const svgContainer = document.createElement("span");
    svgContainer.style.display = "flex";
    svgContainer.style.alignItems = "center";
    svgContainer.style.justifyContent = "center";
    svgContainer.innerHTML = `
  <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1
    c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4
    c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7
    c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2
    c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4
    c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0
    c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9"
    />
  </svg>
`;

    // Create the chat text span
    const chatText = document.createElement("span");
    chatText.id = "chat-text";
    chatText.style.marginLeft = "5px";
    chatText.style.fontWeight = "500";
    chatText.textContent = settings.buttonText || "Chat with us";

    // Append elements to the button
    widgetButton.appendChild(svgContainer);
    widgetButton.appendChild(chatText);

    // Create the chat window
    const chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "70px";
    chatContainer.style[marginSide] =
      settings[`margin${marginSide}px`] || "20px";
    chatContainer.style.width = "300px";
    chatContainer.style.height = "auto";
    chatContainer.style.backgroundColor = "#fff";
    chatContainer.style.borderRadius = "8px";
    chatContainer.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
    chatContainer.style.zIndex = "1000";
    chatContainer.style.opacity = "0";
    chatContainer.style.transform = "translateY(50px)";
    chatContainer.style.transition =
      "transform 0.3s ease-out, opacity 0.3s ease-out";

    // Chat Header (Logo + Name)
    const chatHeader = document.createElement("div");
    chatHeader.style.display = "flex";
    chatHeader.style.alignItems = "center";
    chatHeader.style.padding = "10px";
    chatHeader.style.backgroundColor =
      settings.chatBackgroundColor || "#007bff";
    chatHeader.style.color = "#fff";
    chatHeader.style.borderTopLeftRadius = "8px";
    chatHeader.style.borderTopRightRadius = "8px";

    const brandLogo = document.createElement("img");
    brandLogo.src = settings.brandLogo || "";
    brandLogo.style.width = "40px";
    brandLogo.style.height = "40px";
    brandLogo.style.borderRadius = "50%";
    brandLogo.style.marginRight = "10px";
    brandLogo.style.objectFit = "cover";
    brandLogo.style.objectPosition = "center";
    brandLogo.style.backgroundColor = "#fff";
    brandLogo.style.padding = "5px";
    brandLogo.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";

    const brandInfo = document.createElement("div");
    brandInfo.innerHTML = `
      <div style="font-size: 16px; font-weight: bold;">${
        settings.brandName || "Brand Name"
      }</div>
      <div style="font-size: 12px;">${settings.brandSubtitle || "Online"}</div>
    `;

    chatHeader.appendChild(brandLogo);
    chatHeader.appendChild(brandInfo);

    // Chat Body (Message Card)
    const chatBody = document.createElement("div");
    chatBody.style.padding = "10px";
    chatBody.style.height = "calc(100% - 80px)";
    chatBody.style.overflowY = "auto";
    chatBody.style.backgroundImage =
      "url('https://wd.emovur.com/whatsappBackground.png')";
    chatBody.style.backgroundSize = "cover";
    chatBody.style.backgroundPosition = "center";
    chatBody.style.backgroundRepeat = "no-repeat";
    chatBody.style.display = "flex";
    chatBody.style.flexDirection = "row";
    chatBody.style.alignItems = "center";
    chatBody.style.justifyContent = "flex-start";

    const messageCard = document.createElement("div");
    messageCard.style.backgroundColor = "#f9f9f9";
    messageCard.style.padding = "15px";
    messageCard.style.borderRadius = "8px";
    messageCard.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";
    messageCard.style.marginBottom = "15px";
    messageCard.style.width = "80%";

    messageCard.innerHTML = `
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 5px;">${
        settings.brandName || "Brand Name"
      }</div>
      <div style="font-size: 12px;">${
        settings.onScreenMessage ||
        "Welcome to our support chat. How can we help you?"
      }</div>
    `;

    chatBody.appendChild(messageCard);

    // Chat Footer (Start Button)
    const chatFooter = document.createElement("div");
    chatFooter.style.padding = "10px";
    chatFooter.style.textAlign = "center";
    chatFooter.style.borderTop = "1px solid #ddd";
    chatFooter.style.background = "#ffffff";
    chatFooter.style.borderRadius = "0px 0px 8px 8px";

    const creditsContainer = document.createElement("div");
    creditsContainer.style.display = "flex";
    creditsContainer.style.alignItems = "center";
    creditsContainer.style.justifyContent = "center";
    creditsContainer.style.fontSize = "12px";
    creditsContainer.style.color = "#555";
    creditsContainer.style.marginTop = "10px";

    // Create the text element
    const poweredByText = document.createElement("span");
    poweredByText.textContent = "Powered by ";
    poweredByText.style.marginRight = "5px";

    // Create the image element
    const poweredByImage = document.createElement("img");
    poweredByImage.src = settings.partnerLogo || "";
    poweredByImage.alt = "Powered by Logo";
    poweredByImage.style.width = "60px";
    poweredByImage.style.height = "auto";

    // Append elements to the container
    creditsContainer.appendChild(poweredByText);
    creditsContainer.appendChild(poweredByImage);

    const startButton = document.createElement("button");
    startButton.innerText = settings.chatBtnText || "Start Here";
    startButton.style.padding = "8px 80px";
    startButton.style.border = "none";
    startButton.style.backgroundColor = settings.chatBackgroundColor || "#000";
    startButton.style.color = "#fff";
    startButton.style.borderRadius = "50px";
    startButton.style.cursor = "pointer";
    startButton.onclick = () => {
      window.open(
        `https://wa.me/${settings.countryCode}${settings.whatsappNumber}?text=${settings.preFilledMessage}`,
        "_blank"
      );
    };

    chatFooter.appendChild(startButton);
    chatFooter.appendChild(creditsContainer);

    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatBody);
    chatContainer.appendChild(chatFooter);

    //   // Button Click Event (Open/Close Chat)
    widgetButton.onclick = () => {
      if (chatContainer.style.opacity === "0") {
        chatContainer.style.opacity = "1";
        chatContainer.style.transform = "translateY(-20px)";
        widgetButton.style.width = "50px";
        widgetButton.style.height = "50px";
        widgetButton.style.padding = "10px";
        widgetButton.style.borderRadius = "50%";
        widgetButton.style.justifyContent = "center";
        document.getElementById("chat-text").style.display = "none";
        document.getElementById("chat-icon").style.marginRight = "0";
      } else {
        chatContainer.style.opacity = "0";
        chatContainer.style.transform = "translateY(50px)";
        setTimeout(() => {
          widgetButton.style.width = "auto";
          widgetButton.style.height = "auto";
          widgetButton.style.padding = "10px 15px";
          widgetButton.style.borderRadius = "50px";
          document.getElementById("chat-text").style.display = "inline";
        }, 300);
      }
    };

    // Append elements to body
    document.body.appendChild(widgetButton);
    document.body.appendChild(chatContainer);
  }

  fetch(`${serverUrl}/api/widgets/${widgetId}`)
    .then((response) => response.json())
    .then((settings) => {
      createWidget(settings);
    })
    .catch((err) => console.error("Error loading widget:", err));
})();
