export function handleBuy(option) {
  this.dispatch({
    type: 'BUY_OPTION',
    option,
  });
}

export function handleSell(option) {
  this.dispatch({
    type: 'SELL_OPTION',
    option,
  });
}

export function handleTrade(option, value) {
  this.dispatch({
    type: 'TRADE_OPTION',
    value,
    option,
  });
}

export function handleChange(option, textProp, text) {
  this.dispatch({
    type: 'CHANGE_TEXT',
    option,
    textProp,
    text,
  });
}