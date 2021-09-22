/* eslint-disable @typescript-eslint/no-explicit-any */

import Autosuggest from 'react-autosuggest'

/**
 * This class is a monkeypatch for the problems listed here:
 *
 *  https://github.com/moroshko/react-autosuggest/issues/609
 *
 * about all the problems the current onSuggestionTouchMove() has with
 * keyboards on MobileSafari.
 */
export class AutosuggestPatch extends Autosuggest {
  constructor(props: any) {
    super(props)
    const self = this as any
    self.onSuggestionTouchMove = () => {
      self.justSelectedSuggestion = false
      self.pressedSuggestion = null
    }
  }

  /* monkeypatch the other method here, if you want. see @AndradeB91's comment */
}
