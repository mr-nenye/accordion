import React, { Fragment, useState, createContext, useContext } from "react";
import { FaMountain, FaSkiing, FaWineGlassAlt } from "react-icons/fa";
import "./App.scss";

function Accordion({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div data-accordion>
      {data.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <div data-section key={index}>
            <div
              data-panel-title
              className={isActive ? "expanded" : ""}
              onClick={() => setActiveIndex(index)}
            >
              <span>{tab.label}</span>
              <span>{tab.icon}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

let AccordionContext = createContext();
let AwarenessContext = createContext();

function AccordionCC({ children }) {
  let [activeIndex, setActiveIndex] = useState(0);
  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div data-accordion>
        {children.map((child, index) => {
          return (
            <AwarenessContext.Provider
              key={`section-${index}`}
              value={{ index }}
            >
              {child}
            </AwarenessContext.Provider>
          );
        })}
      </div>
    </AccordionContext.Provider>
  );
}

let SectionContext = createContext();

function Section({ children, disabled }) {
  return (
    <SectionContext.Provider value={{ disabled }}>
      <div data-section>{children}</div>
    </SectionContext.Provider>
  );
}

function Title({ children }) {
  let { activeIndex, setActiveIndex } = useContext(AccordionContext);
  let { index } = useContext(AwarenessContext);
  let isActive = index === activeIndex;
  let { disabled } = useContext(SectionContext);
  return (
    <div
      data-panel-title
      onClick={() => {
        if (!disabled) setActiveIndex(index);
      }}
      className={disabled ? "disabled" : isActive ? "expanded" : ""}
    >
      {children}
    </div>
  );
}

function Content({ children }) {
  let { index } = useContext(AwarenessContext);
  let { activeIndex } = useContext(AccordionContext);
  let isActive = index === activeIndex;
  return (
    <div data-panel-content className={isActive ? "expanded" : ""}>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AccordionCC>
        <Section>
          <Title>
            Dornbirn <FaMountain />
          </Title>
          <Content>ajsdhla</Content>
        </Section>
        <Section disabled>
          <Title>
            Lech <FaSkiing />
          </Title>
          <Content>ajsdhla</Content>
        </Section>
        <Section>
          <Title>
            Madrid <FaWineGlassAlt />
          </Title>
          <Content>ajsdhla</Content>
        </Section>
      </AccordionCC>
    </div>
  );
}

export default App;
