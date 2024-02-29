SignedDecimalFloat
  = "-"? DecimalFloat { return parseFloat(text()); }

DecimalFloat
  = DecimalInteger "." DecimalDigit* _ExponentPart?
  / "." DecimalDigit+ _ExponentPart?
  / DecimalInteger _ExponentPart?

DecimalInteger
  = "0"
  / $( NonZeroDigit DecimalDigit* )

DecimalDigit
  = [0-9]

NonZeroDigit
  = [1-9]

_ExponentPart
  = _ExponentIndicator SignedDecimalInteger

SignedDecimalInteger
  = [+-]? DecimalInteger { return parseInt(text(), 10) }

_ExponentIndicator
  = "e"i
