class PopBlockPanel extends TemplateElement {
  constructor() {
    super();

    this.NewNotification = (_oData) => {
      // disconnect notification
      /** 
       * title: "Warning"
       * type: "POPUP"
       * 2 buttons
       *  _oData.buttons[1].title
       * "@fs-base-onboarding,TT:MENU.SWITCH_OFFLINE"
       * _oData.params.description
       * "@fs-base-onboarding,TT:MENU.POPUP.CHECK_NETWORK_DESC"
       */
     
      // offline notification
      /**
       * title: "Warning"
       * type: "POPUP"
       * 1 button
       * _oData.params.description
       * "TT:MENU.POPUP.BANDWIDTH_FAILURE_WORLD_OFFLINE"
       */

      let closePopup = false;
    
      if (_oData.type == "POPUP" && _oData.title == "Warning") {
        let description = _oData.params.description;
        if(!description) {
          description = "";
        }
        if (_oData.buttons.length == 2 && _oData.buttons[1].title.includes("TT:MENU.SWITCH_OFFLINE") && description.includes("CHECK_NETWORK_DESC")) { // Ok/Switch Offline notification
          closePopup = true;
        } else if(_oData.buttons.length == 1 && description.includes("TT:MENU.POPUP.BANDWIDTH_FAILURE_WORLD_OFFLINE")) { // Ok notification after connection lost
          closePopup = true;
        }
      }

      if(closePopup) {
        Coherent.trigger('NOTIFICATION_BUTTON_CLICKED', 0, _oData.id);
      }
    };
    this.m_notificationsListener = RegisterNotificationsListener();
    this.m_notificationsListener.onSendNewNotification(this.NewNotification);

  }
  get templateID() { return "POPBLOCK_TEMPLATE"; }

  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

Include.addImports([
  "/JS/Services/Notifications.js",
], () => {
  window.customElements.define("panel-popblock", PopBlockPanel);
});


checkAutoload();
