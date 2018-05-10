export const until = {
  getElemCoords: (elem) => {
    const relCoord = elem.getBoundingClientRect();

    return {
      top: relCoord.top + window.pageYOffset,
      left: relCoord.left + window.pageXOffset
    }
  },

  getElemCenter: (elem) => {
    const halfBlock = Math.round(elem.scrollHeight / 2);
    const centre = until.getElemCoords(elem).top + halfBlock;

    return centre;
  },

  getElemPadding: (elem) => {
    if (screen.height > elem.scrollHeight) {
      const padding = (screen.height - elem.scrollHeight) / 2;
      return padding;
    }
  }
};