import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";
import { Card, Table } from "react-bootstrap";

export function FormMeta({ name }: { name: string }) {
  const [debugData, setDebugData] = useState<any>({});

  // Since debug is turned on in docs, we want to listen to this
  let formDebugData: any = null;
  if (typeof window !== "undefined") {
    formDebugData = (window as any).__rdf_debug[name];
  }
  if (formDebugData) {
    const originalObject: any = (window as any).__rdf_debug[name];
    (window as any).__rdf_debug[name] = new Proxy(originalObject, {
      set: function(target, key, value) {
        target[key] = value;
        if (key === "timestamp") {
          setDebugData(target);
        }
        return true;
      },
    });
  }

  return (
    <Card bg="dark" text="white" className="shadow-sm">
      <Card.Body className="p-0">
        <Table variant="dark" style={{ fontSize: "0.8rem" }} className="mb-0">
          <tbody>
            {/* FORM META */}

            <tr>
              <th colSpan={2} className="text-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                Form meta
              </th>
            </tr>

            <tr>
              <td>Submitted?</td>
              <td>
                {debugData?.isSubmitted ? (
                  <div className="text-success d-flex align-items-center">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-warning d-flex align-items-center">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td>Has errors?</td>
              <td>
                {debugData?.returnData?.errors?.count > 0 ? (
                  <div className="text-danger d-flex align-items-center">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-success d-flex align-items-center">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td>Is dirty?</td>
              <td>
                {debugData?.returnData?.isDirty ? (
                  <div className="text-success d-flex align-items-center">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-warning d-flex align-items-center">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>

            {/* FORM STATE */}

            <tr>
              <th colSpan={2} className="text-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                Form state
              </th>
            </tr>

            <tr>
              {debugData?.formState
                ? Object.keys(debugData.formState).map(field => (
                    <React.Fragment key={field}>
                      <td className="font-monospace">{field}</td>
                      <td className="font-monospace text-white-50" style={{ lineBreak: "anywhere" }}>
                        {typeof debugData.formState[field] === "string" ? '"' : ""}
                        {String(debugData.formState[field])}
                        {typeof debugData.formState[field] === "string" ? '"' : ""}
                      </td>
                    </React.Fragment>
                  ))
                : null}
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
