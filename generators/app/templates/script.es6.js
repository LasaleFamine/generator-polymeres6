'use strict';

class <%= elementNameCamelCased %> {
  // Define behaviors with a getter.
  get behaviors() {
    return [];
  }

  // Element setup goes in beforeRegister instead of createdCallback.
  beforeRegister() {
    this.is = '<%= elementName %>';

    // Define the properties object in beforeRegister.
    this.properties = {
      symbols: {
        type: String,
        value: function() { return "Hello this is <%= elementName %>"; },
        observer: '_updateQuotes'
      }
    };
  }

  // Define other lifecycle methods as you need.
  ready() {  }
  attached() {  }
  detached() {  }
  attributeChanged() {  }

    _updateQuotes() {
      // Same as the vanilla component.
    }
}

// Register the element using Polymer's constructor.
Polymer(<%=elementNameCamelCased%>);
