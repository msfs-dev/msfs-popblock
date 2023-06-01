class PopBlockPanel extends TemplateElement {
  constructor() {
    super();

    this.NewNotification = (_oData) => {
      // disconnect notification
      // title: "Warning"
      // type: "POPUP"
      // 2 buttons
      // _oData.buttons[1].title
      // "@fs-base-onboarding,TT:MENU.SWITCH_OFFLINE"
      // _oData.params.description = 
      // "@fs-base-onboarding,TT:MENU.POPUP.CHECK_NETWORK_DESC"

      if (_oData.type == "POPUP" && _oData.title == "Warning" && _oData.buttons.length == 2) {
        if (_oData.buttons[1].title == "@fs-base-onboarding,TT:MENU.SWITCH_OFFLINE" && _oData.params.description == "@fs-base-onboarding,TT:MENU.POPUP.CHECK_NETWORK_DESC") {
          Coherent.trigger('NOTIFICATION_BUTTON_CLICKED', 0, _oData.id);
        }
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