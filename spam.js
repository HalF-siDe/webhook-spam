(function () {
    var isSending = true;
  
    var guiContainer = document.createElement('div');
    guiContainer.style.display = 'none';
    guiContainer.style.position = 'fixed';
    guiContainer.style.top = '20px';
    guiContainer.style.right = '20px';
    guiContainer.style.padding = '15px';
    guiContainer.style.backgroundColor = '#ffffff';
    guiContainer.style.borderRadius = '10px';
    guiContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    guiContainer.style.zIndex = '9999';
  
    var webhookInput = document.createElement('input');
    webhookInput.type = 'text';
    webhookInput.placeholder = 'Enter webhook URL';
    webhookInput.style.width = '100%';
    webhookInput.style.boxSizing = 'border-box';
    webhookInput.style.marginBottom = '10px';
    webhookInput.style.padding = '8px';
    webhookInput.style.border = '1px solid #ccc';
    webhookInput.style.borderRadius = '4px';
  
    var messageInput = document.createElement('textarea');
    messageInput.placeholder = 'Enter message to send (supports ASCII art)';
    messageInput.style.width = '100%';
    messageInput.style.boxSizing = 'border-box';
    messageInput.style.marginBottom = '10px';
    messageInput.style.padding = '8px';
    messageInput.style.border = '1px solid #ccc';
    messageInput.style.borderRadius = '4px';
    messageInput.style.resize = 'vertical';
    messageInput.style.height = '80px';
  
    var stopButton = document.createElement('button');
    stopButton.textContent = 'Stop Sending';
    stopButton.style.width = '100%';
    stopButton.style.padding = '10px';
    stopButton.style.cursor = 'pointer';
    stopButton.style.backgroundColor = '#4CAF50';
    stopButton.style.color = 'white';
    stopButton.style.border = 'none';
    stopButton.style.borderRadius = '4px';
  
    stopButton.addEventListener('click', function () {
      toggleSending();
      guiContainer.style.display = 'none';
    });
  
    function sendWebhookMessages(message, webhookUrl) {
      if (!isSending) {
        return;
      }
  
      var xhr = new XMLHttpRequest();
      xhr.open('POST', webhookUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log('Webhook request successful!');
          } else if (xhr.status !== 204) {
            console.error('Webhook request failed with status ' + xhr.status);
            console.log(xhr.responseText);
          }
  
          setTimeout(function () {
            sendWebhookMessages(message, webhookUrl);
          }, 0);
        }
      };
      xhr.send(JSON.stringify({ content: message }));
    }
  
    function toggleSending() {
      stopButton.textContent = isSending ? 'Start Sending' : 'Stop Sending';
      isSending = !isSending;
  
      var enteredWebhook = webhookInput.value.trim();
      var enteredMessage = messageInput.value.trim();
  
      if (isSending && enteredWebhook !== '' && enteredMessage !== '') {
        sendWebhookMessages(enteredMessage, enteredWebhook);
      }
    }
  
    document.body.appendChild(guiContainer);
    guiContainer.appendChild(webhookInput);
    guiContainer.appendChild(messageInput);
    guiContainer.appendChild(stopButton);
  
    document.addEventListener('keydown', function (event) {
      if (event.code === 'Insert' || event.key.toLowerCase() === 'p') {
        guiContainer.style.display = guiContainer.style.display === 'none' ? 'block' : 'none';
      }
    });
  
    toggleSending();
  })();
  
