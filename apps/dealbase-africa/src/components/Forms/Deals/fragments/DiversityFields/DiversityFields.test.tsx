import { render } from "@testing-library/react";
import { expect } from "vitest";
import { DiversityFields } from ".";

describe("DiversityFields", () => {
  it("should render the expected elements", () => {
    const register = vi.fn();
    const { baseElement } = render(<DiversityFields register={register} />);
    expect(register).toHaveBeenCalledTimes(2);
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div
          id="chakra-toast-portal"
        >
          <ul
            id="chakra-toast-manager-top"
            style="position: fixed; z-index: 5500; pointer-events: none; display: flex; flex-direction: column; margin: 0px auto;"
          />
          <ul
            id="chakra-toast-manager-top-left"
            style="position: fixed; z-index: 5500; pointer-events: none; display: flex; flex-direction: column;"
          />
          <ul
            id="chakra-toast-manager-top-right"
            style="position: fixed; z-index: 5500; pointer-events: none; display: flex; flex-direction: column;"
          />
          <ul
            id="chakra-toast-manager-bottom-left"
            style="position: fixed; z-index: 5500; pointer-events: none; display: flex; flex-direction: column;"
          />
          <ul
            id="chakra-toast-manager-bottom"
            style="position: fixed; z-index: 5500; pointer-events: none; display: flex; flex-direction: column; margin: 0px auto;"
          />
          <ul
            id="chakra-toast-manager-bottom-right"
            style="position: fixed; z-index: 5500; pointer-events: none; display: flex; flex-direction: column;"
          />
        </div>
        <div>
          <div
            class="css-1o42tnp"
          >
            <div
              class="chakra-form-control css-70qvj9"
              role="group"
            >
              <label
                class="chakra-form__label css-1w9kk21"
                for="email-alerts"
                id="field-1-label"
              >
                Has female co-founder?
              </label>
              <label
                class="chakra-switch css-16pgy8f"
              >
                <input
                  aria-disabled="false"
                  aria-invalid="false"
                  class="chakra-switch__input"
                  id="female_founder"
                  style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; width: 1px; margin: -1px; padding: 0px; overflow: hidden; white-space: nowrap; position: absolute;"
                  type="checkbox"
                  value=""
                />
                <span
                  aria-hidden="true"
                  class="chakra-switch__track css-14qxnv8"
                >
                  <span
                    class="chakra-switch__thumb css-0"
                  />
                </span>
              </label>
            </div>
            <div
              class="chakra-form-control css-70qvj9"
              role="group"
            >
              <label
                class="chakra-form__label css-1w9kk21"
                for="email-alerts"
                id="field-2-label"
              >
                Has diverse founders?
              </label>
              <label
                class="chakra-switch css-16pgy8f"
              >
                <input
                  aria-disabled="false"
                  aria-invalid="false"
                  class="chakra-switch__input"
                  id="diverse_founders"
                  style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; width: 1px; margin: -1px; padding: 0px; overflow: hidden; white-space: nowrap; position: absolute;"
                  type="checkbox"
                  value=""
                />
                <span
                  aria-hidden="true"
                  class="chakra-switch__track css-14qxnv8"
                >
                  <span
                    class="chakra-switch__thumb css-0"
                  />
                </span>
              </label>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});
