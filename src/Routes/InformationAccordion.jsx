import Accordion from "react-bootstrap/Accordion";
import "../CSS/InformationAccordion.css";

export default function InformationAccordion(props) {
  return (
    <>
      {props.message}
      <Accordion
        defaultActiveKey={props.activeAccordionKey}
        onSelect={props.onSelect}
      >
        {props.information.map((info, index) => {
          const keyName = Object.keys(info)[0];
          return (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>{keyName}</Accordion.Header>
              <Accordion.Body className="accordion-body-text">
                {info[keyName]}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
}
