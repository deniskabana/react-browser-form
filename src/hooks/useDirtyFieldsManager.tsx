import { useState } from "react";
import { DirtyFieldsManager } from "../types";

export function useDirtyFieldsManager<Schema>(): DirtyFieldsManager<Schema> {
  const [stateDirtyFields, stateSetDirtyFields] = useState<DirtyFieldsManager<Schema>["dirtyFields"]>([]);
  const [isDirty, setIsDirty] = useState<DirtyFieldsManager<Schema>["isDirty"]>(false);

  const setDirtyFields = (fields: Array<keyof Schema>) => {
    stateSetDirtyFields(previousState => [
      ...previousState,
      ...fields.filter(fieldName => !stateDirtyFields.includes(fieldName)),
    ]);
    setIsDirty(true);
  };

  const resetDirtyState = () => {
    stateSetDirtyFields([]);
    setIsDirty(false);
  };

  return {
    dirtyFields: stateDirtyFields,
    resetDirtyState,
    setDirtyFields,
    isDirty,
    setIsDirty,
  };
}
