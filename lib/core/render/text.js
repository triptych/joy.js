/**
 * @class Text
 */
(function(J) {
  /*
   * Constants
   */
  var BASELINE = {
    TOP : 'top',
    HANGING : 'hanging',
    MIDDLE : 'middle',
    ALPHABETIC : 'alphabetic',
    IDEOGRAPHIC : 'ideographic',
    BOTTOM : 'bottom'
  };

  /*
   * Default values
   */
  var
    DEFAULT_FONT = "Normal 12px Verdana",
    DEFAULT_COLOR = "#000000",
    DEFAULT_ALIGN = "left",
    DEFAULT_BASELINE = BASELINE.TOP;

  var Text = J.Renderable.extend({
    init: function(options) {
      if (typeof(options)==="undefined") {
        options = {};
      }
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.text = options.text || "";
      this.font = options.font || DEFAULT_FONT;
      this.color = options.color || DEFAULT_COLOR;
      this.align = options.align || DEFAULT_ALIGN;
      this.baseline = options.baseline || DEFAULT_BASELINE;

      if (options.stroke) {
        this.useStroke();
      } else {
        this.useFill();
      }

      this._super();
    },

    useStroke: function() {
      this.stroke = true;
      this.fillMethod = "strokeText";
      this.styleMethod = "strokeStyle";
    },

    useFill: function() {
      this.stroke = false;
      this.fillMethod = "fillText";
      this.styleMethod = "fillStyle";
    },

    render: function() {
      this.ctx.font = this.font;
      this.ctx.textAlign = this.align;
      this.ctx.textBaseline = this.baseline;

      this.ctx[this.styleMethod] = this.color;
      this.ctx[this.fillMethod](this.text, this.x, this.y);
    },

    /**
     * @method getMeasure
     * @return {TextMetrics} text metrics
     */
    getMeasure: function() {
      this.ctx.measureText(this.text);
    }

  });

  Text.BASELINE = BASELINE;
  J.Text = Text;
})(Joy);
