import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CommentsDialog from "../CommentsDialog";

const MOCK_DIALOG = {
  x: 0,
  y: 0,
  comments: [
    {
      content: "test",
      username: "test",
      timestamp: new Date().toString(),
      id: "000",
    },
  ],
  id: "000",
  color: "red",
};
describe("<CommentsDialog />", () => {
  test("CommentsDialog mounts properly", () => {
    const wrapper = render(
      <CommentsDialog
        currentDialog={MOCK_DIALOG}
        setDialogs={() => null}
        setCurrentDialogId={() => null}
        zoom={0}
        position={{
          x: 0,
          y: 0,
        }}
        username=""
      />
    );
    expect(wrapper).toBeTruthy();

    // Get by text using the React testing library
    const text = screen.getByText(/today/i);
    expect(text.textContent).toBeTruthy();
  });
  test("Resolve button is disabled without any comment", () => {
    const wrapper = render(
      <CommentsDialog
        currentDialog={{ ...MOCK_DIALOG, comments: [] }}
        setDialogs={() => null}
        setCurrentDialogId={() => null}
        zoom={0}
        position={{
          x: 0,
          y: 0,
        }}
        username=""
      />
    );
    const button = wrapper.getByText(/resolve/i) as HTMLButtonElement;
    expect(button?.disabled).toBeTruthy();
  });
});
