import { useDumbForm as RDF, DumbFormOptionsInput, DumbFormReturnType } from "../../dist";

export function useDumbForm<Schema extends {}>(options: DumbFormOptionsInput<Schema>): DumbFormReturnType<Schema> {
  return RDF<Schema>({ ...options, debug: true });
}
