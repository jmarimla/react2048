import React from "react";
import { render } from "@testing-library/react";
import { Button } from "./Button";
import styles from "./Button.module.css";
import { ButtonDirection } from "./AppTypes";

describe("Button Component", () => {
  it("renders a up button properly", () => {
    const rendered = render(<Button direction={ButtonDirection.UP} />);
    const component = rendered.container.firstChild;
    // @ts-ignore: Object is possibly 'null'.
    const classList = component.classList;
    expect(classList.contains(styles.button)).toBeTruthy();
    expect(classList.contains(styles.buttonUp)).toBeTruthy();
  });
  it("renders a down button properly", () => {
    const rendered = render(<Button direction={ButtonDirection.DOWN} />);
    const component = rendered.container.firstChild;
    // @ts-ignore: Object is possibly 'null'.
    const classList = component.classList;
    expect(classList.contains(styles.button)).toBeTruthy();
    expect(classList.contains(styles.buttonDown)).toBeTruthy();
  });
  it("renders a left button properly", () => {
    const rendered = render(<Button direction={ButtonDirection.LEFT} />);
    const component = rendered.container.firstChild;
    // @ts-ignore: Object is possibly 'null'.
    const classList = component.classList;
    expect(classList.contains(styles.button)).toBeTruthy();
    expect(classList.contains(styles.buttonLeft)).toBeTruthy();
  });
  it("renders a right button properly", () => {
    const rendered = render(<Button direction={ButtonDirection.RIGHT} />);
    const component = rendered.container.firstChild;
    // @ts-ignore: Object is possibly 'null'.
    const classList = component.classList;
    expect(classList.contains(styles.button)).toBeTruthy();
    expect(classList.contains(styles.buttonRight)).toBeTruthy();
  });
});
