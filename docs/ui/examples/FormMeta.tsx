import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, OverlayTrigger, Table, Tooltip, TooltipProps } from "react-bootstrap";
import { DebugData, DEBUG_CHANGE_EVENT } from "react-dumb-form";

const renderTypeTooltip = (props: TooltipProps, value: any) => {
  let type: string | JSX.Element;

  if (value === null) {
    type = "null";
  } else if (value === undefined) {
    type = "undefined";
  } else if (value instanceof Date) {
    type = (
      <>
        {typeof value}{" "}
        <span className="d-block">
          <small className="text-warning fst-italic">instanceof</small> Date
        </span>
      </>
    );
  } else {
    type = typeof value;
  }

  return (
    <Tooltip id="button-tooltip" {...props}>
      <code>
        <span className="text-info fst-italic">type </span>
        <strong className="text-secondary">{type}</strong>
      </code>
    </Tooltip>
  );
};

export function FormMeta({ name }: { name: string }) {
  const [debugData, setDebugData] = useState<DebugData<any>>();

  // Pre-populate debugData
  useEffect(() => {
    const debugObject = (window as any).__rdf_debug[name];
    if (debugObject) {
      setDebugData({ ...debugObject });
    }
  }, []);

  // Handling event listener for RDF's custom debug event
  useEffect(() => {
    const eventHandler = (event: Event) => {
      if ((event as CustomEvent)?.detail !== name) return;
      setDebugData({ ...(window as any).__rdf_debug[(event as CustomEvent).detail] });
    };
    document.addEventListener(DEBUG_CHANGE_EVENT, eventHandler);

    return function() {
      document.removeEventListener(DEBUG_CHANGE_EVENT, eventHandler);
    };
  }, [name, setDebugData]);

  return (
    <Card bg="dark" text="white" className="shadow-sm">
      <Card.Body className="p-0">
        <Table variant="dark" style={{ fontSize: "0.75rem" }} className="mb-0" responsive>
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
                  <div className="text-success d-flex align-items-center fw-bold">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-warning d-flex align-items-center fw-bold">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td>Has errors?</td>
              <td>
                {debugData?.returnData?.errorData?.count && debugData.returnData.errorData.count > 0 ? (
                  <div className="text-danger d-flex align-items-center fw-bold">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-success d-flex align-items-center fw-bold">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td>Is dirty?</td>
              <td>
                {debugData?.returnData?.isDirty ? (
                  <div className="text-success d-flex align-items-center fw-bold">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-warning d-flex align-items-center fw-bold">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td>Change reason</td>
              <td className="text-white-50">{debugData?.changeReason}</td>
            </tr>

            {/* FORM STATE */}
            <tr>
              <th colSpan={2} className="text-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                Form state
              </th>
            </tr>

            {debugData?.formState
              ? Object.keys(debugData.formState).map(field => (
                  <tr key={field}>
                    <td className="font-monospace" style={{ minWidth: "130px" }}>
                      {field}
                    </td>
                    <td className="font-monospace text-white-50 w-100" style={{ lineBreak: "anywhere" }}>
                      <OverlayTrigger overlay={props => renderTypeTooltip(props, debugData.formState[field])}>
                        <a
                          href="#"
                          onClick={e => e.preventDefault()}
                          className="fw-bold text-info text-decoration-none"
                          style={{ fontSize: "0.8rem" }}
                        >
                          ?
                        </a>
                      </OverlayTrigger>
                      &nbsp;
                      {typeof debugData.formState[field] === "string" ? '"' : ""}
                      {String(debugData.formState[field])}
                      {typeof debugData.formState[field] === "string" ? '"' : ""}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
