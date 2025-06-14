Hooks.once("ready", () => {
  if (!RollTerm) {
    console.warn("[DDB Evaluate Fix] RollTerm class not found – cannot patch.");
    return;
  }

  if (!RollTerm.prototype._patchedEvaluate) {
    RollTerm.prototype._patchedEvaluate = RollTerm.prototype.evaluate;

    RollTerm.prototype.evaluate = function () {
      if (this._evaluated) {
        console.warn(`[DDB Evaluate Fix] ${this.constructor.name}.evaluate() already called – skipping.`);
        return this;
      }

      return this._patchedEvaluate();
    };

    console.log("[DDB Evaluate Fix] RollTerm.evaluate() successfully patched.");
  } else {
    console.log("[DDB Evaluate Fix] Patch already active.");
  }
});
